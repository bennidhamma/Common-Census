using System;
using EmergeTk.Model;
using System.Net;
using System.IO;
using EmergeTk;
using EmergeTk.Model.Search;
using EmergeTk.WebServices;
using System.Collections.Generic;

namespace CommonCensus
{
	public enum Gender {
		Unknown,
		Male,
		Female
	}
	
	[Indexable(typeof(UserProfileIndexer))]
	[RestService(ModelName="userProfile",ServiceManager=typeof(DefaultServiceManager))]
	public class UserProfile : AbstractRecord
	{
		long facebookUid;
		string name;
		string link;
		string accessToken;
		Whole whole;
		DateTime birthday;
		Gender gender;
		string religion;
		string political;
		

		public long FacebookUid {
			get {
				return this.facebookUid;
			}
			set {
				facebookUid = value;
			}
		}

		public string Name {
			get {
				return this.name;
			}
			set {
				name = value;
			}
		}
		
		public string Link {
			get {
				return this.link;
			}
			set {
				link = value;
			}
		}

		public string AccessToken {
			get {
				return this.accessToken;
			}
			set {
				accessToken = value;
			}
		}	
		
		public Whole Whole {
			get {
				CheckProperty("Whole",whole);
				return this.whole;
			}
			set {
				whole = value;
			}
		}

		public DateTime Birthday {
			get {
				return this.birthday;
			}
			set {
				birthday = value;
			}
		}

		public Gender Gender {
			get {
				return this.gender;
			}
			set {
				gender = value;
			}
		}

		public string Political {
			get {
				return this.political;
			}
			set {
				political = value;
			}
		}

		public string Religion {
			get {
				return this.religion;
			}
			set {
				religion = value;
			}
		}

		public override void Save (bool SaveChildren, bool IncrementVersion, System.Data.Common.DbConnection conn)
		{
			if( Name == null && facebookUid > 0 )
			{
				WebClient wc = new WebClient();
				string url = "https://graph.facebook.com/" + facebookUid + "?access_token=" + accessToken;
				log.Debug("sending url to facebook", url);
				StreamReader sr = new StreamReader(wc.OpenRead(url));
				string json = sr.ReadToEnd();
				var obj = JSON.Default.DecodeObject(json);
				this.name = (string)obj["name"];
				this.link = (string)obj["link"];
				if( obj.ContainsKey("birthday") )
					this.Birthday = DateTime.Parse( (string)obj["birthday"] );
				if( obj.ContainsKey("religion") )
					this.religion = (string)obj["religion"];
				if( obj.ContainsKey("political") )
					this.political = (string)obj["political"];
				if( obj.ContainsKey("gender") )
					this.Gender = (Gender)Enum.Parse(typeof(Gender), (string)obj["gender"], true);
			}
			if( Whole == null )
			{
				Whole = new Whole();
				Whole.Name = this.name + "'s Essential List for Life";
				Whole.Save();
			}
			base.Save (SaveChildren, IncrementVersion, conn);
		}
		
		public UserProfile ()
		{
		}
	}
	
	public class UserProfileIndexer : IIndexer<UserProfile>
	{
		#region IIndexer<UserProfile> implementation
		public void Index (UserProfile record, List<Field> fields)
		{
			if( ! string.IsNullOrEmpty( record.Religion ) )
				fields.Add(new Field("Religion", record.Religion) );
			if( ! string.IsNullOrEmpty( record.Political ) )
				fields.Add(new Field("Political", record.Political) );
			if( record.Gender != Gender.Unknown )
				fields.Add(new Field("Gender", record.Gender.ToString() ) );
			if( record.Birthday != default(DateTime) )
			{
				int ageStart = GetAge(record.Birthday) / 10 * 10;
				fields.Add( new Field( "AgeRange", string.Format( "{0} - {1} years old", ageStart, ageStart+10 ) ) );
			}
			foreach( Part p in record.Whole.Parts )
			{
				fields.Add( new Field("Need", p.Name) );
			}
		}
						           
		private int GetAge(DateTime birthday)
		{
			DateTime now = DateTime.Today;
			int age = now.Year - birthday.Year;
			if (birthday > now.AddYears(-age)) age--;
			return age;
		}
		#endregion
		
	}
}


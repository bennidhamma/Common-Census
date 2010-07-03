using System;
using System.Collections.Generic;
using EmergeTk;
using EmergeTk.Model;
using EmergeTk.WebServices;
using EmergeTk.Model.Search;

namespace CommonCensus
{
	[Indexable(typeof(PartIndexer))]
	[RestService(ModelName="part",ServiceManager=typeof(DefaultServiceManager))]
	public class Part : AbstractRecord
	{
		public string Name {get;set;}
		
		public string Canonical { 
			get {
				if( !string.IsNullOrEmpty(Name) )
					return Name.ToLower().Replace(" ","_");
				else
					return null;
			}
		}
		
		private IRecordList<Comment> comments;
		public IRecordList<Comment> Comments {
			get {
				if( comments == null )
					lazyLoadProperty<Comment>("Comments");
				return comments;
			}
			set {
				comments = value;
			}
		}	
		
		private int wholeCount = -1;
		public int WholeCount {
			get {
				if( wholeCount == -1 )
					wholeCount = this.LoadParentIds( ColumnInfoManager.RequestColumn<Whole>("Parts") ).Count;
				return wholeCount;
			}
			set {
				wholeCount = value;	
			}
		}
		
		public IRecordList<UserProfile> Owners { 
			get {
				IRecordList<Whole> wholes = this.LoadParents<Whole>("Parts");
				IRecordList<UserProfile> userProfiles = new RecordList<UserProfile>();
				foreach( Whole w in wholes )
				{
					UserProfile up = AbstractRecord.Load<UserProfile>(new FilterInfo("Whole", w) );
					if( up != null )
						userProfiles.Add( up );
				}
				return userProfiles;
			}
		}
	}
	
	public class PartIndexer : IIndexer<Part>
	{
		protected static readonly EmergeTkLog log = EmergeTkLogManager.GetLogger(typeof(PartIndexer));
		#region IIndexer[Part] implementation
		public void Index (Part record, List<Field> fields)
		{
			fields.Add(new Field("Name", record.Name));
			fields.Add(new Field("Canonical", record.Canonical));
			fields.Add(new Field("WholeCount", record.WholeCount));
		}
		#endregion		
	}
}


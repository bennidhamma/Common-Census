using System;
using EmergeTk.Model;
using EmergeTk.WebServices;

namespace CommonCensus
{
	[RestService(ModelName="comment",ServiceManager=typeof(DefaultServiceManager))]
	public class Comment : AbstractRecord
	{
		private UserProfile author;
		public UserProfile Author {
			get {
				CheckProperty("Author",author);
				return author;
			}
			set {
				author = value;
			}
		}
		
		public DateTime Date { get; set; }
		
		public string Title { get; set; }
		
		public string Body { get; set; }
		
		public Comment()
		{
			Date = DateTime.Now;	
		}
	}
}
using System;
using EmergeTk.Model;

namespace CommonCensus
{
	
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
	}
}


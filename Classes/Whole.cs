using System;
using EmergeTk.Model;
using EmergeTk.Model.Search;
using EmergeTk.WebServices;

namespace CommonCensus
{
	//[Searchable(typeof(DefaultIndexer))]
	[RestService(ModelName="whole",ServiceManager=typeof(DefaultServiceManager))]
	public class Whole : AbstractRecord
	{
		public string Name {get;set;}
		
		[PropertyType(DataType.LargeText)]
		public string Description {get;set;}
		
		private IRecordList<Part> parts;
		
		public IRecordList<Part> Parts
		{
			get
			{
				if( parts == null )
					lazyLoadProperty<Part>("Parts");
				return parts;
			}
			set
			{
				parts = value;
			}
		}
		
		public Whole ()
		{
		}
	}
}


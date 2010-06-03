using System;
using EmergeTk.Model;

namespace CommonCensus
{
	[Searchable(typeof(DefaultIndexer))]
	[RestService(ModelName="part",ServiceManager=typeof(DefaultServiceManager))]
	public class Part : AbstractRecord
	{
		public string Name {get;set;}
		
		[PropertyType(DataType.LargeText)]
		public string Description {get;set;}
		
		public Part ()
		{
		}
	}
}


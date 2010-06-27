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
		
	}
	
	public class PartIndexer : IIndexer<Part>
	{
		protected static readonly EmergeTkLog log = EmergeTkLogManager.GetLogger(typeof(PartIndexer));
		#region IIndexer[Part] implementation
		public void Index (Part record, List<Field> fields)
		{
			log.Debug("adding field ", record.Name);
			fields.Add(new Field("Name", record.Name));
			fields.Add(new Field("Canonical", record.Canonical));
		}
		#endregion		
	}
}


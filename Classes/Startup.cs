using System;
using System.Collections;
using System.Web;
using System.Web.SessionState;
using EmergeTk;
using EmergeTk.Model;
using EmergeTk.Model.Search;

namespace CommonCensus
{
	public class Startup
	{
		private static readonly EmergeTkLog log = EmergeTkLogManager.GetLogger(typeof(Startup));
		
		static bool initialized = false;
				
		public static void InitializeServices()
		{
			if( ! initialized )
			{
				//this could be a critical section, but it's not the end of the world if it executes twice.
				initialized = true;
				log.Info("Starting up CommonCensus");
				string cacheProvider = Setting.GetValueT<string>("CacheProvider");
				log.Debug("cacheProvider key : ", cacheProvider );
				if( ! String.IsNullOrEmpty( cacheProvider ) )
				{
					Type cacheType = TypeLoader.GetType(cacheProvider);
					if( cacheType != null )
					{
						ICacheProvider cacheInstance = (ICacheProvider)Activator.CreateInstance(cacheType);
						CacheProvider.Instance = cacheInstance;
						log.Info("Activated provider ", cacheInstance );
					}
					else
					{
						throw new InvalidOperationException(string.Format("Could not initialize provider '{0}' for service '{1}'", cacheProvider, "CacheProvider" ));
					}					
				}
				else
					log.Warn("Using default provider for cache.");
				
				string searchProvider = Setting.GetValueT<string>("SearchProvider");
				log.Debug("searchProvider key : ", searchProvider );
				if( ! String.IsNullOrEmpty( searchProvider ) )
				{
					Type searchType = TypeLoader.GetType(searchProvider);
					if( searchType != null )
					{
						ISearchServiceProvider searchInstance = (ISearchServiceProvider)Activator.CreateInstance(searchType);
						EmergeTk.Model.Search.IndexManager.Instance = searchInstance;
						log.Info("Activated provider ", EmergeTk.Model.Search.IndexManager.Instance );
						
						searchInstance.CommitEnabled = Setting.GetValueT<bool>("SearchCommitEnabled",true);
					}
					else
					{
						throw new InvalidOperationException(string.Format("Could not initialize provider '{0}' for service '{1}'", searchProvider, "SearchProvider" ));
					}
				}
				else
					log.Warn("Using default provider for search.");
			}
		}
	}
}
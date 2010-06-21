// Global.asax.cs
//	
//

using System;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.SessionState;
using EmergeTk;
using EmergeTk.Model;
using EmergeTk.Model.Search;

namespace CommonCensus
{
	
	
	public class Global : System.Web.HttpApplication
	{
		static readonly EmergeTkLog log = EmergeTkLogManager.GetLogger(typeof(Global));
		static int sessionsOpened,sessionsClosed;
		
		protected virtual void Application_Start(object sender, EventArgs e)
		{
			Startup.InitializeServices();
		}
		
		protected virtual void Session_Start(object sender, EventArgs e)
		{
			sessionsOpened++;
			log.Info("Session Starting.  ~ # opened: {0}.  ~ # closed: {1}. ~ # current sessions: {2}",
					sessionsOpened, sessionsClosed, sessionsOpened - sessionsClosed);
		}
		
		protected virtual void Application_BeginRequest(object sender, EventArgs e)
		{
		}
		
		protected virtual void Application_EndRequest(object sender, EventArgs e)
		{
		}
		
		protected virtual void Application_AuthenticateRequest(object sender, EventArgs e)
		{
		}
		
		protected virtual void Application_Error(object sender, EventArgs e)
		{
		}
		
		protected virtual void Session_End(object sender, EventArgs e)
		{
			sessionsClosed++;
			log.Info("Session Ending.  ~ # opened: {0}.  ~ # closed: {1}. ~ # current sessions: {2}",
					sessionsOpened, sessionsClosed, sessionsOpened - sessionsClosed);
		}
		
		protected virtual void Application_End(object sender, EventArgs e)
		{
		}
	}
}

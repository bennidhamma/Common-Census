using System;
namespace CommonCensus
{
	public enum NeedType {
		Physiological,
		Safety,
		LoveBelonging,
		SelfEsteem,
		SelfActualization,
		PeakExperience
	}
	
	public enum MetLevel {
		Unmet,
		Met,
		WellMet
	}
	
	public class NeedProfile : AbstractRecord
	{
		private UserProfile userProfile;
		private Part part;
		
		public NeedType NeedType { get; set; }
		public MetLevel MetLevel { get; set; }
		
		public NeedProfile ()
		{
		}
	}
}
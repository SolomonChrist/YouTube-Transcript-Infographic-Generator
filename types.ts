export enum StylePreset {
  Corporate = 'Corporate',
  ColorfulSocial = 'Colorful Social',
  Minimalist = 'Minimalist',
  ModernDark = 'Modern Dark',
  FreshClean = 'Fresh & Clean',
  Geometric = 'Geometric',
}

export interface SourceData {
  title: string;
}

export interface KeyInsight {
  title: string;
  description: string;
  icon_keyword: string;
}

export interface InfographicData {
  sourceData: SourceData;
  insights: KeyInsight[];
}

// FIX: Added missing VideoData interface to resolve import error in youtubeService.ts.
export interface VideoData {
  title: string;
  channelName: string;
  uploadDate: string;
}
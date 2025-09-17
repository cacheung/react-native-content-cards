declare module '@adobe/react-native-aepmessaging' {
  export interface ContentTemplate {
    id: string;
    [key: string]: any;
  }

  export interface ContentCardViewProps {
    template: ContentTemplate;
    listener?: (event: string, card: ContentTemplate) => void;
    styleOverrides?: any;
    [key: string]: any;
  }

  export class Messaging {
    static updatePropositionsForSurfaces(surfaces: string[]): Promise<void>;
    static getContentCardUI(surface: string): Promise<ContentTemplate[]>;
    static [key: string]: any;
  }

  export const ContentCardView: React.ComponentType<ContentCardViewProps>;

  // Hook for content card UI
  export function useContentCardUI(surface: string): {
    content: ContentTemplate[];
    error: any;
    isLoading: boolean;
    refetch: () => Promise<void>;
  };

  export * from './models/ContentCard';
}

declare module '@adobe/react-native-aepcore' {
  export enum LogLevel {
    ERROR = 'ERROR',
    WARNING = 'WARNING', 
    DEBUG = 'DEBUG',
    VERBOSE = 'VERBOSE'
  }

  export class MobileCore {
    static trackAction(action: string, contextData?: Record<string, any>): void;
    static trackState(state: string, contextData?: Record<string, any>): void;
    static setLogLevel(level: LogLevel): void;
    static getLogLevel(): Promise<LogLevel>;
    static initializeWithAppId(appId: string): Promise<void>;
    static [key: string]: any;
  }
}

declare module '@adobe/react-native-aepedge' {
  export interface ExperienceEvent {
    xdm: Record<string, any>;
    data?: Record<string, any>;
  }

  export class Edge {
    static sendEvent(experienceEvent: ExperienceEvent): Promise<void>;
    static [key: string]: any;
  }
}

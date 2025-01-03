export interface ConfigType {
  version: string;
  appName: string;
  basic: {
    name: string;
    description: string;
    show: boolean;
    fontFamily: {
      index: number;
      value: string;
    };
    fontSize: {
      index: number;
      value: string;
    };
    children: Array<{
      name: string;
      parent: string;
      description: string;
      isNeedReload: boolean;
      type: string;
      value: string;
      props: {
        option: Array<{
          label: string;
          value: string;
        }>;
      };
    }>;
  };
  windows: {
    name: string;
    description: string;
    show: boolean;
    closeAppMode: {
      index: number;
      value: number;
    };
    winsNum: {
      index: number;
      value: number;
    };
    children: Array<{
      name: string;
      parent: string;
      description: string;
      isNeedReload: boolean;
      type: string;
      value: number;
      props: {
        data?: Array<{
          label: string;
          value: number;
        }>;
        min?: number;
        max?: number;
        showInput?: boolean;
        showTip?: boolean;
        marks?: {
          1: string;
          5: string;
          10: string;
          15: string;
        };
      };
    }>;
  };
  language: {
    name: string;
    description: string;
    show: boolean;
    lang: {
      index: number;
      value: string;
    };
    children: Array<{
      name: string;
      parent: string;
      description: string;
      isNeedReload: boolean;
      type: string;
      value: string;
      props: {
        option: Array<{
          value: string;
          label: string;
        }>;
        filterable: boolean;
      };
    }>;
  };
  keyboard: {
    name: string;
    description: string;
    show: boolean;
    keyboardList: {
      value: any[];
      index: number;
    };
    children: Array<{
      name: string;
      parent: string;
      value: any[];
      description: string;
      type: string;
      props: {
        list: Array<{
          name: string;
          keyArr: any[];
        }>;
      };
    }>;
  };
  network: {
    name: string;
    description: string;
    show: boolean;
    baseUrl: {
      index: number;
      value: string;
    };
    timeOut: {
      index: number;
      value: number;
    };
    children: Array<{
      name: string;
      parent: string;
      value: string | number;
      description: string;
      isNeedReload: boolean;
      type: string;
      props: {
      };
    }>;
  };
  download: {
    name: string;
    description: string;
    show: boolean;
    downloadPath: {
      index: number;
      value: string;
    };
    children: Array<{
      name: string;
      parent: string;
      value: string;
      description: string;
      isNeedReload: boolean;
      type: string;
      props: {
      };
    }>;
  };
}
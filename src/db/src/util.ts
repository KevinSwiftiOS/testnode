import { FieldType } from './constant';

// interface DocumentModel {
//   _id: string;
// }

/**
 * 工具模块
 *
 *
 */
export const Util = {
  /**
   * 格式化后端返回的文档数据
   *
   * @param document - 后端文档数据
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  formatResDocumentData: (documents: any[]) =>
    documents.map((document) => Util.formatField(document)),

  /**
   * 格式化字段
   *
   * 主要是递归数组和对象，把地理位置和日期时间转换为js对象。
   *
   * @param document
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  formatField: (document) => {
    const keys = Object.keys(document);
    let protoField = {};

    // 数组递归的情况
    if (Array.isArray(document)) {
      protoField = [];
    }

    for (const key of keys) {
      const item = document[key];
      const type = Util.whichType(item);
      let realValue;
      switch (type) {
        // case FieldType.Timestamp:
        //   realValue = new Date(item.$timestamp * 1000);
        //   break;
        case FieldType.Date:
          realValue = item;
          break;
        case FieldType.Object:
        case FieldType.Array:
          realValue = Util.formatField(item);
          break;
        case FieldType.ServerDate:
          realValue = new Date(item.$date);
          break;
        default:
          realValue = item;
      }

      if (Array.isArray(protoField)) {
        protoField.push(realValue);
      } else {
        protoField[key] = realValue;
      }
    }

    return protoField;
  },

  /**
   * 查看数据类型
   *
   * @param obj
   */
  whichType: (obj: any): string => {
    let type = Object.prototype.toString.call(obj).slice(8, -1);

    if (type === FieldType.Date) {
      return FieldType.Date;
    }

    if (
      type === FieldType.Object && // if (obj instanceof Point) {
      //   return FieldType.GeoPoint
      // } else if (obj instanceof Date) {
      //   return FieldType.Timestamp
      // } /* else if (obj instanceof Command) {
      //   return FieldType.Command;
      // } */ else if (
      //   obj instanceof ServerDate
      // ) {
      //   return FieldType.ServerDate
      // }

      // if (obj.$timestamp) {
      //   type = FieldType.Timestamp // 特殊结构 秒级时间戳 是否可去掉 {a: {$timestamp: xxx}} => {a: xxx * 1000}
      // } else
      obj.$date
    ) {
      type = FieldType.ServerDate;
    }

    return type;
  },

  /**
   * 生成文档ID
   *
   * 为创建新文档使用
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  generateDocId: () => {
    const chars = 'ABCDEFabcdef0123456789';
    let autoId = '';
    for (let i = 0; i < 24; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return autoId;
  },
};

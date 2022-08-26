import { ValueExpression } from "slonik";

export function deleteQuery(tableName: string, id: ValueExpression) {
  return `DELETE FROM ${tableName} WHERE id = ${id}`;
}

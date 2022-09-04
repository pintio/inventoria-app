import { DatabasePoolConnection, sql } from "slonik";

export async function setWorkspaceSessionVariable(
  connection: DatabasePoolConnection,
  workspace_id: string
) {
  // setting up postgresql session variable 'app.currentuser' equal to the worspace_id.
  // this variable is then used to access rows from the tables that have RLS enabled.
  // the policies applied to the tables will match the session variable 'app.currentuser'
  try {
    console.log(workspace_id, "noice");
    await connection.query(
      sql`SET app.currentuser = ${sql.literalValue(workspace_id)}`
    );
    return;
  } catch (error) {
    console.log(error);
    throw new Error("error while setting up the session variable");
  }
}

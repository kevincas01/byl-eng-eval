import getUserResultsAction from "@/actions/userResults";
import getRoleResultsAction from "@/actions/roleResults";
import {  sortRoleResultsBasedOnUserScore } from "@/lib/utils";

import RoleTypeContainer from "@/components/summary/RoleTypeContainer";

export default async function Summary() {
  const userId = "24601";
  const userResponse = await getUserResultsAction(userId);
  const rolesResponse = await getRoleResultsAction();

  if (!userResponse.ok || !rolesResponse.ok) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>
          There was an error loading the Summary data. Please try again later
        </p>
      </div>
    );
  }
  const userResults = userResponse.results;
  const roleResults = rolesResponse.results;

  const sortedRoleResults = sortRoleResultsBasedOnUserScore(
    roleResults,
    userResults
  );
  return (
    <div className="flex flex-col gap-10 px-10 items-center">
      <RoleTypeContainer
        roleResults={sortedRoleResults.slice(0, 4)}
        startingIndex={0}
        roleType="core"
      />

      <RoleTypeContainer
        roleResults={sortedRoleResults.slice(4, 7)}
        startingIndex={4}
        roleType="intermediate"
      />
      <RoleTypeContainer
        roleResults={sortedRoleResults.slice(7)}
        startingIndex={7}
        roleType="peripheral"
      />
    </div>
  );
}

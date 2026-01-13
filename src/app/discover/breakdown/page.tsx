import BreakdownContainer from "@/components/breakdown/BreakdownContainer";
import getUserResultsAction from "@/actions/userResults";
import getRoleResultsAction from "@/actions/roleResults";
import { roleResultsToMap, sortRoleResultsBasedOnUserScore } from "@/lib/utils";

export default async function Breakdown() {
  const userId = "24601";
  const userResponse = await getUserResultsAction(userId);
  const rolesResponse = await getRoleResultsAction();

  if (!userResponse.ok || !rolesResponse.ok) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>
          There was an error loading the breakdown data. Please try again later
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

  const roleResultsMap = roleResultsToMap(roleResults);

  return (
    <BreakdownContainer
      userResults={userResponse.results}
      roleResults={sortedRoleResults}
      roleResultsMap={roleResultsMap}
    />
  );
}

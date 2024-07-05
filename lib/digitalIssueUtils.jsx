 const groupIssuesByYear = (issues) => {
    return issues.reduce((acc, issue) => {
      const year = new Date(issue.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(issue);
      return acc;
    }, {});
  };
  
  export default groupIssuesByYear;
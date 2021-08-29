export default (...names) => {
  return (subject, sub, matchSelf = false) => {
    if (subject === sub) {
      return matchSelf;
    }
    for (const n of names) {
      if (!(n in subject) || !(n in sub)) {
        return false;
      }
      if (subject[n] !== sub[n]) {
        return false;
      }
    }
    return true;
  };
};

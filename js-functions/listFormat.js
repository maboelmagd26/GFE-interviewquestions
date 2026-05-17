export default function listFormat(items, options = {}) {
  const personsReactsList = [...items];
  let othersMsg = "";
  let finalReactsMsg = "";
  const OTHERS_SEPARATOR = "and";
  const OTHERS_LABEL = "other";
  const SEPARATOR = ", ";
  if (personsReactsList.length == 0) {
    return "";
  }
  if (Object.keys(options).length == 0) {
    const lastItemIdx = personsReactsList.length - 1;
    finalReactsMsg =
      personsReactsList.slice(0, lastItemIdx).join(SEPARATOR) +
      OTHERS_SEPARATOR +
      personsReactsList[lastItemIdx];
    return finalReactsMsg;
  }
  if (options.unique) {
    personsReactsList = [...new Set(personsReactsList)];
  }
  if (options.sorted) {
    personsReactsList.sort();
  }
  if (options.length) {
    const friendsMsg = personsReactsList
      .slice(0, options.length)
      .join(SEPARATOR);
    let othersCount = personsReactsList.slice(options.length).length;
    if (othersCount > 1) {
      othersMsg = `${OTHERS_SEPARATOR}  ${othersCount} ${OTHERS_LABEL}s`;
    } else {
      othersMsg = ` ${OTHERS_SEPARATOR} 1 ${OTHERS_LABEL}`;
    }
    finalReactsMsg = friendsMsg + othersMsg;
    return finalReactsMsg;
  }
}

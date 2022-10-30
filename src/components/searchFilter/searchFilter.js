const SearchFilter = {
  search: function (listToFilter, propertyToSearch, searchValue) {
    if (!listToFilter || !searchValue) return false;
    const regexSearchTerm = new RegExp(searchValue, "i");
    listToFilter = listToFilter.filter(listItem => {
      let isValid = false;
      let count = -1;
      while(propertyToSearch[++count]) {
        if(regexSearchTerm.test(listItem[propertyToSearch[count]])) isValid = true
      }
      if(isValid) return listItem;
    });
    return listToFilter;
  }
}

export default SearchFilter;
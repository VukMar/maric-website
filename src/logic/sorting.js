export const sortByDate = (topicList) =>{
    if (!topicList || topicList.length === 0) {
        return null;
    }
    
    const sortedBlogs = topicList.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
    
        return dateB - dateA;
    });

    return sortedBlogs;
}

export const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}

export const sortByViews = (topicList) => {
    if (!topicList || topicList.length === 0) {
        return null;
    }
    
    const sortedBlogs = topicList.sort((a, b) => {
            const dateA = a.views;
            const dateB = b.views;
    
        return dateB - dateA;
    });

    return sortedBlogs;
}
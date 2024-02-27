export const subItemRoute = (location:string, sectionType: string) => {
    return location.replace(/(student|staff)/g, sectionType).toString();
};
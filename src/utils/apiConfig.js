//Base Url for all API
export const baseUrl = 'http://localhost:8080'; 

//Member API
export const ClubManagementSystemrBaseUrl = '/api/v1/user';
//Admin API
export const CMSBaseUrl = '/api/v1/admin';

export const getAllMember = ClubManagementSystemrBaseUrl + '/getMember';
export const addNewMember =  ClubManagementSystemrBaseUrl + '/addMembers';
export const memberLogin =  ClubManagementSystemrBaseUrl + '/login';

//Make Payment Get Point API
export const makePayment = ClubManagementSystemrBaseUrl +  '/';

//Facility
export const getAllFacility = CMSBaseUrl + '/getFacilities';
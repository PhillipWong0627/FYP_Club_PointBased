//Base Url for all API
export const baseUrl = 'http://localhost:8081'; 

//Member API
export const ClubManagementSystemrBaseUrl = '/api/v1/user';
//Admin API
export const CMSBaseUrl = '/api/v1/admin';

export const getAllMember = ClubManagementSystemrBaseUrl + '/getMember';
export const getMemberById = ClubManagementSystemrBaseUrl + "/getById"
export const addNewMember =  ClubManagementSystemrBaseUrl + '/addMembers';
export const memberLogin =  ClubManagementSystemrBaseUrl + '/login';
export const updateMemberById = ClubManagementSystemrBaseUrl + '/updateById';
export const deleteMemberById = ClubManagementSystemrBaseUrl + '/deleteById';

//Make Payment Get Point API
export const makePayment = ClubManagementSystemrBaseUrl +  '/';

//Facility
export const getAllFacility = CMSBaseUrl + '/getFacilities';
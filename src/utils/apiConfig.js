//Base Url for all API
export const baseUrl = 'http://localhost:8081';

//Member API
export const ClubManagementSystemrBaseUrl = '/api/v1/user';
//Admin API
export const CMSBaseUrl = '/api/v1/admin';

//Cloudinary
export const CLOUDINARY_URL = 'cloudinary://135839877197964:yze7Yhd9_ahk831ajE6rKe3j0t4@dnzypglvm';

export const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dnzypglvm/{resource_type}/upload"

export const getAllMember = ClubManagementSystemrBaseUrl + '/getMember';
export const getMemberById = ClubManagementSystemrBaseUrl + "/getById"
export const addNewMember = ClubManagementSystemrBaseUrl + '/addMembers';
export const memberLogin = ClubManagementSystemrBaseUrl + '/login';
export const updateMemberById = ClubManagementSystemrBaseUrl + '/updateById';
export const deleteMemberById = ClubManagementSystemrBaseUrl + '/deleteById';

//Make Payment Get Point API
export const makePayment = ClubManagementSystemrBaseUrl + '/';

//Facility
export const getAllFacility = CMSBaseUrl + '/getFacilities';

//Events
export const getAllEvents = CMSBaseUrl + '/events/all'
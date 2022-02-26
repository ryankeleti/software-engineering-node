/**
 * @file Declares Location data type representing a User's
 * coordinates
 */

/**
 * @typedef Location Represents position
 * @property {number} latitude Latitude component
 * @property {number} longitude Longitude component
 */
export default interface Location {
    latitude: number,
    longitude: number
};

/**
 * A regex to match if string contains any whitespaces.
 * @example
 * '  myStr' // leading space(s) will match
 * 'myStr  ' // trailing space(s) will match
 * 'anyCharacter--$#$TW&     *&%@*#!ÉÀ' // in between space(s) will match
 */
export const containSpaceRegex = /^\S*$/;

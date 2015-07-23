var assert = chai.assert;
var expect = chai.expect;

describe("The AddressBook App", function(){
    describe("The contact service", function(){
        it("Should have a contact property", function(){
            module('AddressBook')
            inject(function($injector){
                contactService = $injector.get("contactService");
            });
            expect(contactService.contacts).to.be.an('array');
        })
    })
});
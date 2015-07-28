var assert = chai.assert;
var expect = chai.expect;

describe("The AddressBook App", function () {
    describe("The contact service", function () {

        beforeEach(function () {
            module('AddressBook');
            inject(function ($injector) {
                contactService = $injector.get("contactService");
                $httpBackend = $injector.get("$httpBackend");
            });
        });

        it("Should have a contact property", function () {
            expect(contactService.contacts).to.be.an('array');
        });

        it("Should call the backend", function () {
            $httpBackend.expectGET("http://localhost:9001/contacts")
                .respond(200, []);
            $httpBackend.flush();

        });

    });

    describe("the contact controller", function () {
        beforeEach(function () {
            module('AddressBook');
            inject(function ($injector, $rootScope) {
                $scope = $rootScope.$new();
                contactService = $injector.get("contactService");
                $httpBackend = $injector.get("$httpBackend");
                $controller = $injector.get('$controller');
            });
        });
        it("Should store array of contact in scope", function () {
            $controller('ContactController', {$scope: $scope, contactService: contactService});
            assert.isArray($scope.contacts);
        });

    });

    describe("The proper filter", function () {
        beforeEach(function () {
            module('AddressBook');
            inject(function ($injector) {
                proper = $injector.get('$filter')('proper');
            });
        });
        it('should proper case a string', function () {
            expect(proper('ned stark')).to.equal('Ned Stark');
        });
        it('should take a number and return that as a string', function(){
            expect(proper(42)).to.equal('42');
        });

        it('it should throw an error on an incompatible type', function(){
            assert.throw(function(){
                proper(undefined);
            })
        })

    });

    describe ('avatar', function(){
       beforeEach(function(){
           module('AddressBook');
       });

        it('should display the first letter of a name', function(){
            inject(function($rootScope, $compile){
                $rootScope.contact = { name: 'jon kar' };
                 var element = $compile('<avatar name=contact.name />')($rootScope);
                $rootScope.$digest();
                var dirText = element.text();
                expect(dirText).to.equal('J');
            })
        })

    });



});
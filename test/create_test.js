const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

    it('saves a user', (done) => {
        const joe = new User({
            name: 'Joe'
        });

        joe.save()
            .then(() => {
                // Has Joe been saved successfully?

                // isNew flag = true means Joe has not been saved
                // isNew flag = false means Joe has been saved
                assert(!joe.isNew);
                done();
            });
    });

});
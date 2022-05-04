import {calculateFreeTimes} from './calculateFreeTimes';

describe('calculateFreeTimes function', () => {
  it('calculate all available times correctly', () => {
    const times = calculateFreeTimes(
      {
        data: {
          'jack@example.com': {busy: [{start: '2022-05-09T07:00:00Z', end: '2022-05-09T09:00:00Z'}]},
          'bob@example.com': {busy: [{start: '2022-05-09T08:00:00Z', end: '2022-05-09T09:00:00Z'}]},
          'henry@example.com': {busy: [{start: '2022-05-09T07:00:00Z', end: '2022-05-09T09:00:00Z'}]},
        },
      },
      ['2022-05-09T07:00:00Z', '2022-05-09T09:00:00Z'],
      60,
    );
    expect(times).toHaveProperty('times');
  });
});

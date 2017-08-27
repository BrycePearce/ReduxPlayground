import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {

  // Arrange (initialize the system under test)
  // We are doing this so we can have nice angular intellisense + scope..
  let component: VoteComponent;

  // this will run before each test, that way, any changes from a first test, will not affect the second
  beforeEach(() => {
    // ..But we are initializing here
    component = new VoteComponent();
  });

  it('should increment totalVotes when upvoted', () => {

    // Act (calling a method or function)
    component.upVote();

    // Assertion
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downvoted', () => {

    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
});

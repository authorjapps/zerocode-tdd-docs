# BASIC GUIDELINES
This repo is maintained with contributions from various collaborators across the world. On the personal front, recently I as well as few of our other contributors have been slightly busy with their respective day jobs, family and other side projects. Hence to resolve the issues quickly and efficiently, please follow the simple guidelines below. Please keep the problem description as straightforward as it can be so that it can be understood at the 1st read. 

# Welcoming New PRs
PRs are welcome. If you figure out how to fix an issue or add a feature, don't hesitate to issue a Pull Request, even if it's your own issue or problem you are facing.
In this way you help yourselves as well as help other who is facing simillar issues

# Reviewers


1. Add reviewr 1 (If Kafka related) TODO:

1. Add reviewr 1 (If HTTP related) TODO:

1. Add reviewr 1 (If Mocking or Spring boot related) TODO:


# Guidelines

1. Basic guidelines are laid down in [CONTRIBUTING](https://github.com/authorjapps/zerocode/blob/master/CONTRIBUTING.md) for raising an issue or a feature request
Clearly capture in term of the following:
- Is it an issue ?
- Are you requesting a feature ?
- Is it a Bug ?
- Are you looking for an answer to a question(s) ?

2. But while raising an issue or a problem or an incident or a feature-request, please take care of the following points without which the `issue` might get rejected. The AC(Acceptance Criteria)s are:

3. **AC1**- You have captured relevant logs into the ticket e.g. a scenario's all step(s) output. 
> You can find the logs under "target/logs" in case you missed it from IDE console

4. **AC2**- Write down the steps you performed which led to this issue or incident you are reporting

5. **AC3**- Provide all steps to reproduce the issue - Best is to provide your configs(or code changes) and the scenario file(stripping out any business-sensitive information)

6. Clearly capture into the story/ticket what is actual-result and what is the expected-result
   + In case of a Feature request or a Tool request - Please provide enough details stepwise

7. If you are simply asking a question or want to clarify something, please explain the issue in terms of what you want to achieve or which business use-case you want to solve. Please explain this with clarity.

Example
--------

# Wrong way:
_Note here: There is no business scenario or usecase provided. This makes difficult for our collaborators to understand the scenario you are trying to automate._

As an automation tester

AC:

I want `$EQ/$NOT.EQ for non-numerics` to be supported by the framework

So that I can compare strings using `$NOT.EQ` and continue to do my automation work.

# Right way:
_Note here: There is a business scenario or usecase provided next to the issue description_ 👍 

AC:

As an automation tester

I want `$EQ/$NOT.EQ for non-numerics` to be supported by the framework

So that I can compare strings using `$NOT.EQ` and continue to do my automation work.

```
Business use-case example:

So let's say I create a Ticket object(e.g. a POST call). It gets assigned to an agent from a random pool of agents. 
The created entity then returns with the "agent_id" field. 

Next time I create a ticket(a new POST call), I don't know which agent will get assigned to it, 
but I want to be sure it was not the previous one.
```

AC = Acceptance Criteria. If you have more ACs, mark them as AC1, AC2...

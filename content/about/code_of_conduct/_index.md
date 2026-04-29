+++
title = "Code of Conduct"
+++

# NUMFOCUS CODE OF CONDUCT

You can find the whole document [here][NumFOCUS Code of Conduct]. 

## THE SHORT VERSION

NumFOCUS is dedicated to providing a harassment-free community for everyone, regardless of gender, sexual orientation, gender identity and expression, disability, physical appearance, body size, race, or religion.
We do not tolerate harassment of community members in any form.

Be kind to others. Do not insult or put down others.
Behave professionally.
Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for NumFOCUS.

All communication should be appropriate for a professional audience including people of many different backgrounds.
Sexual language and imagery is not appropriate.

Thank you for helping make this a welcoming, friendly community for all.

## LONG VERSION

You can find the long version of the Code of Conduct on the [NumFOCUS Code of Conduct][] page.

## HOW TO REPORT

If you feel that the Code of Conduct has been violated, feel free to submit a report, by using the [NumFOCUS Code of Conduct Reporting Form](https://numfocus.typeform.com/to/ynjGdT).

## WHO WILL RECEIVE YOUR REPORT

Your report will be received and handled by NumFOCUS Code of Conduct Working Group; trained, and experienced contributors with diverse backgrounds.
The group is making decisions independently from the project, PyData, NumFOCUS or any other organization.

You can learn more about the current group members, as well as the reporting procedure on the [NumFOCUS Code of Conduct][] page.

[NumFOCUS Code of Conduct]: https://numfocus.org/code-of-conduct


# scverse AI Policy

## Overview

scverse encourages its users to get involved with the development process, and if a user wishes to write code AI-assisted, that is also great!
We encourage our users to do what is comfortable for them.
However, since AI-assisted coding has led many open source projects to experience a massive increase in low-quality code submissions, we want to clarify our position in this document.

## Submitting AI-generated code

Once you have written that code, and you would like to contribute it to scanpy, squidpy, anndata etc., a human must review it.
Our job is thus not only to secure the project (i.e., prevent bitcoin mining or other malicious code), but also to make sure it is maintainable in the longer term i.e., do we understand what is written and do we think it will be easy for others to understand should any of us be replaced or leave?
AI often writes bloated and overly verbose comments, code, and tests.
We try to ensure that every line of code has meaning and is necessary, and with AI-generated code, that is less often the case.
When we look at a line of code two years down the line, it helps greatly if that line has clear context, semantically-meaningful variable names, and is concise.

Time is always a limited resource.
Every hour we spend reviewing submitted code, we are not writing code ourselves.
Therefore, we request that users be respectful of our time and ask themselves, "Would you want to review this PR?"
Generally, whether AI touched the PR or not, it should present your best attempt to improve a publicly shared resource with clean, thoughtful code and concise and accurate PR descriptions.
If you are unsure about something, that’s fine – help us clean up code that you don’t fully understand by drawing our attention to it with a review or code comment, and clearly mark which parts of your PR comments are just speculation or AI output.
We are also mindful that coders come to our projects at all levels, and we hope that, in the process of our review, you will learn our best practices.
From our side, you can expect us to be patient as you learn.
However, this process fundamentally does not take place when you feed an LLM our hand-crafted PR reviews.
As a general rule of thumb, it should not take a human longer to review the code than it does for you to write it. 

You are responsible for the code you submit. This also includes the licensing of the submitted code. 

## Repeated submission of low-quality code

You might say that a user can submit bad code repeatedly without an LLM, which is true.
Indeed, if you were to submit a PR every 5 minutes that added “sadlkjfalsdjkfhasf” to all of our docs, that would also be bad.
But an LLM can submit a PR every 5 minutes that looks reasonable and thus isn't easy to detect as spam.
As stated previously, we do not review code only to improve what makes it into our repo; we also review to improve your ability to code, if you may need that.

We thus reserve the right to call out any PR we believe violates this policy with a warning.

As the legal and practical ramifications of the to-date nascent application of generative AI in coding emerge, we reserve the right to update this document.

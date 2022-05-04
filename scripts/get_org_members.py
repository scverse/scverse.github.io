#!/usr/bin/python3
"""
This script generates toml entries for the contributors section of the People page.

For now, just copy and paste the results into there.
"""

import os
from textwrap import dedent
from github import Github

# People who have agreed to be a part, but didn't click yes on the github invite before it expired
extra_users = [
    "PierreBoyeau",
    "gokceneraslan",
    "vals",
    "vitkl",
    "lewlin",
    "talashuach",
]


def get_contributors() -> list[dict]:
    def _name_key(user_json: dict) -> str:
        if user_json["name"] is not None:
            name = user_json["name"]
        else:
            name = user_json["login"]
        return name.lower()

    g = Github(os.environ["GITHUB_TOKEN"])

    members = list(g.get_organization("scverse").get_members())
    for user in extra_users:
        member = g.get_user(user)
        if member not in members:
            members.append(member)

    results = []
    for m in members:
        results.append(
            {
                "avatar_url": m.avatar_url,
                "login": m.login,
                "name": m.name,
            }
        )
    results.sort(key=_name_key)

    return results


def format_contributor_entry(user_json) -> str:
    if user_json["name"] is not None:
        name = user_json["name"]
    else:
        name = "@" + user_json["login"]
    login = user_json["login"]
    avatar_url = user_json["avatar_url"]

    entry = f"""\
    [[contributors.members]]
        name = "{name}"
        url = "https://github.com/{login}"
        img = "{avatar_url}"
    """

    return dedent(entry)


def format_contributors(users: list) -> str:
    return "\n\n".join([format_contributor_entry(user) for user in users])


def main():
    contributors = get_contributors()
    print(format_contributors(contributors))


if __name__ == "__main__":
    main()

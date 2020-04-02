# Utvikling

Dette er en beskrivelse av hvordan teamet vårt har valgt å gjennomføre utviklingsprosessen. Fremtidige utviklingsteam behøver ikke benytte seg av våre rutiner om de ikke ønsker.

## Bruk av git og GitLab

Teamet har besluttet å benytte seg av av standarder for bruk av git og GitLab som beskrevet i [L. Cuellar](https://www.agileana.com/blog/git-best-practices-for-agile-projects-and-distributed-teams/) og [V. Wu](https://about.gitlab.com/blog/2018/03/05/gitlab-for-agile-software-development/). I korte trekk innebærer det:

| Agile Artifact  | Gitlab function |
| --------------- | --------------- |
| User Story      | Issues          |
| Task            | Task List       |
| Product Backlog | Issue List      |
| Sprint          | Milestones      |
| Agile Board     | Issue Board     |

- Master branchen skal inneholde den nyeste releasen.
- Development branch brukes for utvikling og integrasjon av endringer.
- Hver brukerhistorie har sin egen branch, og merges tilbake til development etter godkjenning fra et annet gruppemedlem.
- Når hele teamet er enig om at koden er stabil og klar for produksjon lages det en release branch fra development branchen, og denne merges til master branchen.
- Hver commit melding må referere til issue nummeret den bygger mot.

## Kodestandarder

For Django(Python) bruker vi [Autopep8](https://pypi.org/project/autopep8/) for automatisk formatering av koden, slik at all kode er likt formatert. For JavaScript bruker vi [Prettier](https://prettier.io/).

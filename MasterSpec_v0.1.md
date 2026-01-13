# MasterSpec_v0.1

This repository publishes the **public spine** for INVICTA:

- A clean human site (W3C-style)
- A stable vocabulary resolver
- A canonical IRI base that resolves every `ClosedVocabularyID` into **human + machine** views

The dynamic PIRTOE graphs (PSIgold / PSIreal / PAIhistorical) can evolve behind this interface without breaking it.

---

## 01 Site map

- `/` (front door)
- `/mission`
- `/platform`
- `/volunteer`
- `/vocabulary/` (resolver + index)
- `/resolve/` (resolver helper)

Canonical resolver base:

- `/vocabulary/{ClosedVocabularyID}`

GitHub Pages note: direct path routing is implemented via `404.html` redirect into `/vocabulary/?id=...`.

---

## 02 Resolver spec v0.1

### 02.01 Canonical IRI rule

Canonical:

- `(IRI) = "https://invictaresearch.ai/vocabulary/{ClosedVocabularyID}"`

Version IRI:

- `(New) = "https://invictaresearch.ai/vocabulary/{ClosedVocabularyID}/v/{Version}"`

### 02.02 Required fields (minimum)

Every record MUST expose:

- `(ID)`
- `(IRI)`
- `(Type)`
- `(Version)`
- `(New)`
- `(Review + Status)`
- `(WFF + Level)`
- `(WFF + Link)`
- `(Sign)`

### 02.03 Type rule

`(Type)` MUST be one of:

- `Atom`
- `SSM`
- `Substring`
- `Subgraph`
- `Graph`
- `("Super" + "Graph")`

### 02.04 Review rule

Governance MUST be visible:

- `(Review + Status) = "Draft" | "Review" | "Valid"`
- OPTIONAL (for later): `(Review + Role)`, `(Vote + Weight)`

### 02.05 Evidence rule

If a definition is asserted, include:

- `(Source + Link)` (definition source)
- OPTIONAL: `(Evidence + Link)` (supporting context)

### 02.06 Atom composition rule

If `(Type) = "SSM"` and Atom count > 1:

- `(Atom + Count)` (integer)
- `(Atom + List)` (ordered list of Atom IRIs)
- `(SSM)` (computable string form)

If `(Type) = "Atom"`:

- `(Atom + Count) MUST be 1`

### 02.07 Substring rule (PUO left side is never omitted)

If `(Type) = "Substring"`, records MUST include:

- `(PUO + Left)` with all PUO category slots present (blank allowed)
- `(CWW + Right)` (CWW expression string)

### 02.08 WFF nesting rule

Every record MUST include:

- `(WFF + Level)` = same as `(Type)`
- `(WFF + Link)` = pointer to canonical WFF anchor for that level/version
- OPTIONAL: `(WFF + Text)` for a verbatim WFF template excerpt

---

## 03 Gold-standard WFF template excerpt (verbatim)

The site displays the following excerpt in the Platform → WFF section:

```
Corrrected: ((PIRTOE + PUO) + (Template = Substring))[(Left = (PUO + Endurant)[(PUO + (Category[(Logic → Subgraph → Computation → PIRTOE → 5WH → Senses → Sensemaking) ⊃ (Category, Component)[(Logic = (If, And, Or, Else, Then), Subgraph = (PSIgold, PSIreal, PAIhistorical), Computation = (Good, Bad, Best, Best Practice), 5WH = (What, Where, When, Who, How, Why), Senses = (See, Hear, Smell, Taste, Touch, Intuition), Sensemaking = (Feel, Remember, Think, Understand, Idea, Innovation))]), (Right = (CWW + Expression = (Atom = NOT[((PIRTOE + PUO) + Endurant)])] ...
```

---

## 04 Repo tree (minimum)

- `index.html`
- `mission.html`
- `platform.html`
- `volunteer.html`
- `vocabulary/index.html`
- `resolve/index.html`
- `data/vocabulary/index.json`
- `data/vocabulary/{ClosedVocabularyID}.json`
- `assets/styles.css`
- `assets/script.js`
- `assets/vocab.js`
- `404.html`

---

## 05 Contribution rule (single-record PRs)

1. Add one new file: `data/vocabulary/{ClosedVocabularyID}.json`
2. Append to: `data/vocabulary/index.json`
3. Set `(Review + Status) = "Draft"`
4. Include `(Source + Link)` for the definition
5. Submit pull request


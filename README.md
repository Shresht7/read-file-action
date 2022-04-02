<!-- ================ -->
<!-- READ FILE ACTION -->
<!-- ================ -->

<h1 align='center'>
  Read File Action
</h1>

<!-- ================= -->
<!-- REPOSITORY BADGES -->
<!-- ================= -->

<div align='center'>

[![Release](https://img.shields.io/github/v/release/Shresht7/read-file-action?style=for-the-badge)](https://github.com/Shresht7/Gist-Mirror/releases)
[![License](https://img.shields.io/github/license/Shresht7/read-file-action?style=for-the-badge)](./LICENSE)

</div>

<!-- =========== -->
<!-- DESCRIPTION -->
<!-- =========== -->

<p align='center'>
<!-- slot: description  -->
A GitHub Action to read a file and export its contents
<!-- /slot -->
</p>

<!-- =============== -->
<!-- WORKFLOW BADGES -->
<!-- =============== -->

<div align='center'>

[![Test](https://github.com/Shresht7/read-file-action/actions/workflows/test.yml/badge.svg)](https://github.com/Shresht7/read-file-action/actions/workflows/test.yml)
[![Validate](https://github.com/Shresht7/read-file-action/actions/workflows/validate.yml/badge.svg)](https://github.com/Shresht7/read-file-action/actions/workflows/validate.yml)
[![Action Readme](https://github.com/Shresht7/read-file-action/actions/workflows/action-readme.yml/badge.svg)](https://github.com/Shresht7/read-file-action/actions/workflows/action-readme.yml)

</div>

<!-- ================= -->
<!-- TABLE OF CONTENTS -->
<!-- ================= -->

<details>

<summary align='center'>Table of Contents</summary>

- [📖 Usage](#-usage)
- [📋 Inputs](#-inputs)
- [📋 Outputs](#-outputs)
- [📃 Workflow Example](#-workflow-example)
- [📑 License](#-license)

</details>

---

## 📖 Usage

Use this action in a workflow step

```yaml
- name: read-file
  id: read-file
  uses: Shresht7/read-file-action@v1
  with:
    path: ./README.md
```

You can then access the output contents using [expressions][1].

`${{ steps.read-file.outputs.contents }}`

> Note: this assumes you set the id as `read-file`.

You can tell this action to automatically parse `yaml` or `json` by specifying the `parse` input.

```yaml
- name: read-file
  id: read-file
  uses: Shresht7/read-file-action@v1
  with:
    path: ./package.json
    parse: json
```

> You can also set `parse` to `true` to let the action automatically determine the file-extension.

The parsed contents will be available as a stringified JSON. This output can be used by [`fromJSON`][2] in an [expression][1] or `JSON.parse` in an action.

---

## 📋 Inputs

<!-- slot: inputs  -->
| Input   | Description                                                                                                                                                                                                |     Default |   Required   |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------: | :----------: |
| `path`  | Path to the file to read (can be a URL)                                                                                                                                                                    | `undefined` | **required** |
| `parse` | Parse the file contents as `yaml` or `json`. If `true`, will try to automatically determine the file-extension. You can set it to `yaml` or `json` manually too. If `false`, it will return the raw string | `undefined` |              |
<!-- /slot -->

## 📋 Outputs

<!-- slot: outputs  -->
| Output     | Description              |
| :--------- | :----------------------- |
| `contents` | The contents of the file |
<!-- /slot -->

## 📃 Workflow Example

The following workflow snippet demonstrates how this action can be used to read a file and its contents can be used by other actions. The snippet itself is placed here using this action in conjunction with the [markdown-slots][3] action.

<details>

<summary>Click to show</summary>

<!-- slot: example, prepend: ```yaml, append: ``` -->
```yaml
# ================
# READ FILE ACTION
# ================

name: Read File Example

# Activation Events
# =================

on:
  # When this workflow file changes
  push:
    branches:
      - main
    paths:
      - .github/workflows/example-workflow.yml

  # Manual workflow dispatch
  workflow_dispatch:

# Jobs
# ====

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      # Actions Checkout ✅
      # ===================

      - name: checkout
        uses: actions/checkout@v3

      # Read File 📄
      # ============

      - name: read-file
        id: read-file
        uses: Shresht7/read-file-action@v1
        with:
          path: .github/workflows/example-workflow.yml

      # Markdown Slots 📋
      # =================

      - name: markdown-slots
        id: markdown-slots
        uses: Shresht7/markdown-slots@main
        with:
          slots: |
            - slot: example
              content: ${{ toJSON(steps.read-file.outputs.contents) }}
          # steps.read-file.outputs.contents is itself a YAML string (example-workflow.yml)
          # which causes markdown-slots action to try and parse it as a part of content and fail.
          # the toJSON function forces the results into a one-line string.

      # Push Changes 🌎
      # ===============

      - name: check for changes
        id: git-diff
        run: |
          if git diff --exit-code; then
            echo "::set-output name=changes_exist::false"
          else
            echo "::set-output name=changes_exist::true"
          fi

      - name: push
        if: ${{ steps.git-diff.outputs.changes_exist == 'true' }}
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add .
          git commit -m 'Update README.md 📄'
          git push

```
<!-- /slot -->

</details>

---

## 📑 License

[MIT](./LICENSE)

<!-- LINKS -->

[1]: https://docs.github.com/en/actions/learn-github-actions/expressions
[2]: https://docs.github.com/en/actions/learn-github-actions/expressions#fromjson
[3]: https://www.github.com/Shresht7/markdown-slots
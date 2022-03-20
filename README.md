<h1 align='center'>Read File Action</h1>

<p align='center'>
<!-- slot: description  -->
A GitHub Action to read a file and export its contents
<!-- /slot -->
</p>

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

You can then access the output contents using [expressions](https://docs.github.com/en/actions/learn-github-actions/expressions).

`${{ steps.read-file.outputs.contents }}`

> Note: this assumes you set the id as `read-file`.

The action will, by default, try to automatically parse `yaml` or `json` files and export the contents as a stringified JSON. This output can be used by `fromJSON` in an [expression](https://docs.github.com/en/actions/learn-github-actions/expressions) or `JSON.parse` in an action.

You can also explicitly state the type of the file by passing it in as a input

```yaml
- name: read-file
  id: read-file
  uses: Shresht7/read-file-action@v1
  with:
    path: ./package.json
    type: json
```

If you need to retrieve the raw string, set the `type` to something like `raw` or `string`.

---

## 📋 Inputs

<!-- slot: inputs  -->
| Input  | Description                                 |     Default |   Required   |
| :----- | :------------------------------------------ | ----------: | :----------: |
| `path` | Path to the file to read (can be a URL)     | `undefined` | **required** |
| `type` | Parse the file contents as `yaml` or `json` | `undefined` |              |
<!-- /slot -->

## 📋 Outputs

<!-- slot: outputs  -->
| Output     | Description              |
| :--------- | :----------------------- |
| `contents` | The contents of the file |
<!-- /slot -->

## 📃 Workflow Example

The following workflow snippet demonstrates how this action can be used to read a file and  its contents can be used by other actions. The snippet itself is placed here using this action in conjunction with the [markdown-slots](https://www.github.com/Shresht7/markdown-slots) action.

<details>

<summary>Click to show</summary>

<!-- slot: example {prefix: ```yaml} | {suffix: ```} -->
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
      - ./.github/workflows/example-workflow.yml

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
        uses: Shresht7/read-file-action@main
        with:
          path: ./.github/workflows/example-workflow.yml
          type: raw

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
          # which causes markdown-slots to parse it as a part of content and fail.
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
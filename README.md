<h1 align='center'>Read File Action</h1>

---

<!-- slot: description  -->
A GitHub Action read, parse and expose contents of a file
<!-- /slot -->

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

If you need to retrieve the raw string, set the `type` to something like `raw` or `null`.

## 📋 Inputs

<!-- slot: inputs  -->
| Input  | Description                             |     Default |   Required   |
| :----- | :-------------------------------------- | ----------: | :----------: |
| `src`  | Path to the file to read (can be a URL) | `undefined` | **required** |
| `type` | Parse the file contents as (`yaml`      |     `json`) | `undefined`  |  |
<!-- /slot -->

## 📋 Outputs

<!-- slot: outputs  -->
| Output     | Description   |
| :--------- | :------------ |
| `contents` | File contents |
<!-- /slot -->

## 📃 Workflow Example

The following workflow snippet demonstrates how this action can be used to read a file and  its contents can be used by other actions. The snippet itself is placed here using this action in conjunction with the [markdown-slots](https://www.github.com/Shresht7/markdown-slots) action.

<!-- slot: example {prefix: ```yaml} | {suffix: ```} -->
<!--  -->

## 📑 License

[MIT](./LICENSE)
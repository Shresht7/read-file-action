<h1 align='center'>Read File Action</h1>

---

<!-- slot: description  -->
A GitHub Action read, parse and expose contents of a file
<!-- /slot -->

## Usage

## Inputs

<!-- slot: inputs  -->
| Input  | Description                                  |     Default |   Required   |
| :----- | :------------------------------------------- | ----------: | :----------: |
| `src`  | Path to the file to read (can be a URL)      | `undefined` | **required** |
| `type` | Parse the file contents as (`yaml` | `json`) | `undefined` |              |
<!-- /slot -->

## Outputs

<!-- slot: outputs  -->
| Output     | Description   |
| :--------- | :------------ |
| `contents` | File contents |
<!-- /slot -->
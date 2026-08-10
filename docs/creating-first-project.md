# KDL Framework — Creating Your First Project

Follow this guide to create and generate your first landing page using the KDL Framework.

## Step 1: Create Client Folder
Create a client folder with assets and briefing:

```text
Clientes/
  My-Restaurant/
    briefing/
      briefing.json
    assets/
      logo.svg
```

## Step 2: Run KDL CLI
Run `kdl create` to execute the Master Pipeline:

```bash
kdl create Clientes/My-Restaurant --niche restaurants
```

## Step 3: View Generated Landing Page
The compiled landing page is located at:
`Clientes/My-Restaurant/landing/index.html`

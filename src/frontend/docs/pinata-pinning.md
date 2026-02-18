# Pinata IPFS Pinning Guide

This guide explains how to use the modern Pinata SDK pinning scripts to upload files to IPFS.

## Prerequisites

1. **Pinata Account**: Sign up at [https://pinata.cloud](https://pinata.cloud)
2. **API Key**: Create a JWT token at [https://app.pinata.cloud/developers/api-keys](https://app.pinata.cloud/developers/api-keys)
3. **Node.js**: Version 18 or higher
4. **Pinata SDK**: Installed via `npm install pinata`

## Environment Variables

The pinning scripts require the following environment variables:

### Required

- `PINATA_JWT` - Your Pinata API JWT token (required for authentication)

### Optional

- `PINATA_GATEWAY` - Your Pinata gateway domain (e.g., `example-gateway.mypinata.cloud`)

### Setup

1. Copy the example environment file:
   ```bash
   cp frontend/.env.pinata.example frontend/.env.pinata
   ```

2. Edit `frontend/.env.pinata` and add your credentials:
   ```bash
   PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   PINATA_GATEWAY=my-gateway.mypinata.cloud
   ```

3. Load the environment variables before running scripts:
   ```bash
   source frontend/.env.pinata
   # or
   export $(cat frontend/.env.pinata | xargs)
   ```

## Usage

### Pin a Single File

To pin a single file, the script will handle it as part of a directory scan:


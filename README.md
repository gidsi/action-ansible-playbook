# Run Ansible playbook Github Action

An action that executes given Ansible playbook on selected hosts.

## Usage

```yaml
- name: Run playbook
  uses: dawidd6/action-ansible-playbook
  with:
    playbook: deploy.yml
    key: ${{secrets.SSH_PRIVATE_KEY}}
    inventory: |
      [all]
      example.com

      [group1]
      example.com
    vault_password: ${{secrets.VAULT_PASSWORD}}
    options: |
      --limit dev
      --extra-vars hello=there
      --verbose
```

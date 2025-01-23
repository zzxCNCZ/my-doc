# rsync
> 文件传输，同步工具

`rsync` 是一个非常强大的文件传输和同步工具，广泛用于在本地和远程系统之间高效地复制和同步文件。它的主要优势在于仅传输已更改的部分，从而节省带宽和时间。

### 基本用法

```bash
rsync [options] source destination
```

### 常用选项

1. **基本选项**：
   - `-a`：归档模式，等同于 `-rlptgoD`，表示递归复制并保留符号链接、权限、时间戳、组和所有者。
   - `-v`：详细模式，显示传输过程中的详细信息。
   - `-z`：在传输时压缩文件，节省带宽。
   - `-P`：显示进度，并在中断时支持断点续传。
   - `-h`：以人类可读的方式显示文件大小。

2. **文件选择**：
   - `--include=PATTERN`：包含匹配的文件。
   - `--exclude=PATTERN`：排除匹配的文件。
   - `--exclude-from=FILE`：从文件中读取要排除的模式。

3. **权限和所有权**：
   - `--no-owner`：不保留文件所有者信息。
   - `--no-group`：不保留文件组信息。
   - `--chown=USER:GROUP`：在目标上更改文件的所有者和组。

4. **网络选项**：
   - `-e SSH`：通过 SSH 进行传输。
   - `--bwlimit=RATE`：限制带宽使用。

5. **其他有用的选项**：
   - `--dry-run`：执行模拟操作，显示将要做的更改，但不实际执行。
   - `--delete`：在目标中删除源中不存在的文件。

### 示例

1. **本地文件夹同步**：
   ```bash
   rsync -av /path/to/source/ /path/to/destination/
   ```

2. **远程文件夹同步**：
   ```bash
   rsync -avz -e ssh /path/to/source/ user@remote_host:/path/to/destination/
   ```

3. **排除特定文件类型**：
   ```bash
   rsync -av --exclude='*.tmp' /path/to/source/ /path/to/destination/
   ```

4. **使用带宽限制**：
   ```bash
   rsync -av --bwlimit=1000 /path/to/source/ user@remote_host:/path/to/destination/
   ```

5. **模拟执行**：
   ```bash
   rsync -av --dry-run /path/to/source/ /path/to/destination/
   ```

6. **后台执行**：
    ```bash
    # H为迁移时保留硬链接
    nohup sudo rsync -avH --progress /media/ /store/media/ > /store/rsync.log 2>&1 &
    ```

### 常见错误及解决

- **权限问题**：如果遇到权限相关的错误，可以尝试使用 `sudo` 或者 `--no-owner` 和 `--no-group` 选项。
- **文件系统限制**：某些文件系统（如 exFAT）不支持 UNIX 风格的权限，可能导致错误。
- **网络问题**：如果在远程传输中遇到问题，检查网络连接和 SSH 配置。


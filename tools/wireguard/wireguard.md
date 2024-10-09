# wireguard使用
[官网](https://www.wireguard.com/)

1. 安装
```bash
sudo apt install wireguard
# 安装resolvconf  （服务端安装）
sudo apt install resolvconf
```
2. 生成本机公钥和私钥（客户端和服务段都需要生城）
```bash
# 私钥
umask 077
wg genkey > privatekey
# 公钥
wg pubkey < privatekey > publickey
```
3. 配置服务端
```bash
vim wg0.conf

# 如下
[Interface]
Address = 10.0.10.1
# 监听端口 udp
ListenPort = 56789
# 服务端私钥
PrivateKey = MOqoNfyl+0i54vFUHEp7Gdv9/Zg6wcU+TA468HvBf0U=
DNS = 8.8.8.8
PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[peer]
# 客户端ip
AllowedIPs = 10.0.10.2
# 客户端公钥
PublicKey = QReB/eMdHYnN9qbOE4mFAuxpHRFx39A6G2QAedgBWHM=

```
4. 配置客户端
```bash
[Interface]
PrivateKey = 0OlFV+eu7iWSOIDj/ECbXk5jfLdUtmVzJFQ7+e7DCl8=
Address = 10.0.10.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = 5OCxKLY+Y+au8I4BXJECQmt04JIvpziI44LufLNOZUA=
AllowedIPs = 10.0.10.2/24
Endpoint = server.940303.xyz:56789
#当会话存在一端 IP 地址为 NAT 地址或虚假公网 IP 地址时，由该方阶段性每 15 秒发送 keepalive 报文保持会话的可用性，防止被设备终止。
PersistentKeepalive = 15

```
4. 启动服务端(使用wg-quick启动)
```bash
sudo wg-quick up /pathto/wg0.conf

```


### 其他指令
停止
```bash
 wg-quick down /full/path/to/wg0.conf

```

启动与重启
```bash
设置为自动启动 wg0：systemctl enable wg-quick@wg0
禁用服务：systemctl disable wg-quick@wg0
启动服务：systemctl start wg-quick@wg0
重启服务：systemctl restart wg-quick@wg0
查看服务状态：systemctl status wg-quick@wg0
```

静态添加节点peer
```bash
# 静态的方式(wg0.conf) 添加节点后需要重启服务，动态添加不需要重启
wg addconf wg0 <(wg-quick strip ./wg0.conf)

```

动态方式 （推荐）
```bash
wg set wg0 peer $(cat cpublickey1) allowed-ips xxx.xxx.xxx.xxx/32 persistent-keepalive 15
#如果显示正常，那么我们就保存到配置文件
wg-quick save wg0
```

停止与启动
```bash
# 启动/停止 VPN 网络接口
$ ip link set wg0 up
$ ip link set wg0 down

# 注册/注销 VPN 网络接口
$ ip link add dev wg0 type wireguard
$ ip link delete dev wg0

# 注册/注销 本地 VPN 地址
$ ip address add dev wg0 192.0.2.3/32
$ ip address delete dev wg0 192.0.2.3/32

# 添加/删除 VPN 路由
$ ip route add 192.0.2.3/32 dev wg0
$ ip route delete 192.0.2.3/32 dev wg0

```
查看信息
```bash

# 查看系统 VPN 接口信息
$ ip link show wg0

# 查看 VPN 接口详细信息
$ wg show all
$ wg show wg
```

[参考1](https://fuckcloudnative.io/posts/wireguard-docs-practice/)

[参考2](https://tengwait.com/2020/07/12/WireGuard%E6%90%AD%E5%BB%BA%E4%B8%8E%E4%BD%BF%E7%94%A8/)
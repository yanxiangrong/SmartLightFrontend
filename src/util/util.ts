export default function addrToHex(addr: Number) {
  return "0000".substr(0, 4 - addr.toString(16).length)
    + addr.toString(16).toUpperCase()
}

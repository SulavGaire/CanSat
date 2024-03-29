#include <SPI.h>
#include <LoRa.h>

void setup() {
  Serial.begin(9600);
  while (!Serial);
  LoRa.setPins(8, 9, 2);


//  Serial.println("LoRa Receiver");

  if (!LoRa.begin(433E6)) {
//    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
//    Serial.print("Received packet '");

    // read packet
    while (LoRa.available()) {
//      digitalWrite(13, HIGH);
//      delay(100);
//      digitalWrite(13, LOW);
//      delay(100);
//      digitalWrite(13, HIGH);
//      delay(100);
//      digitalWrite(13, LOW);
//      delay(100);
//      Serial.print((char)LoRa.read());
      Serial.print(LoRa.readString());
      Serial.println();
      delay(1000);
    }

    // print RSSI of packet
//    Serial.print("' with RSSI ");
//    Serial.println(LoRa.packetRssi());
  }
}

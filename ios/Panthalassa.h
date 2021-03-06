//
//  Panthalassa.h
//  Pangea
//
//  Created by Alberto R. Estarrona on 18/04/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <panthalassa/panthalassa.h>
#import <React/RCTEventEmitter.h>
#import "PanthalassaUpStreamBridge.h"

@interface Panthalassa : RCTEventEmitter <RCTBridgeModule, UpStreamProtocolDelegate> {
  PanthalassaUpStreamBridge* upstreamClient;
  PanthalassaUpStreamBridge* upstreamUI;
}

@end

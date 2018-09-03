// Objective-C API for talking to github.com/Bit-Nation/panthalassa Go package.
//   gobind -lang=objc github.com/Bit-Nation/panthalassa
//
// File is generated by gobind. Do not edit.

#ifndef __Panthalassa_H__
#define __Panthalassa_H__

@import Foundation;
#include "Universe.objc.h"


@class PanthalassaPanthalassa;
@class PanthalassaStartConfig;
@protocol PanthalassaUpStream;
@class PanthalassaUpStream;

@protocol PanthalassaUpStream <NSObject>
- (void)send:(NSString*)data;
@end

@interface PanthalassaPanthalassa : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
/**
 * add friend to peer store
 */
- (BOOL)addContact:(NSString*)pubKey error:(NSError**)error;
/**
 * Export account with the given password
 */
- (NSString*)export:(NSString*)pw pwConfirm:(NSString*)pwConfirm error:(NSError**)error;
/**
 * Stop the panthalassa instance
this becomes interesting when we start
to use the mesh network
 */
- (BOOL)stop:(NSError**)error;
@end

@interface PanthalassaStartConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)encryptedKeyManager;
- (void)setEncryptedKeyManager:(NSString*)v;
- (NSString*)signedProfile;
- (void)setSignedProfile:(NSString*)v;
- (NSString*)ethWsEndpoint;
- (void)setEthWsEndpoint:(NSString*)v;
- (BOOL)enableDebugging;
- (void)setEnableDebugging:(BOOL)v;
- (NSString*)privChatEndpoint;
- (void)setPrivChatEndpoint:(NSString*)v;
- (NSString*)privChatBearerToken;
- (void)setPrivChatBearerToken:(NSString*)v;
@end

FOUNDATION_EXPORT NSString* PanthalassaAllChats(NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaCall(NSString* command, NSString* payload, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaCallDAppFunction(NSString* signingKey, long id_, NSString* args, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaConnectLogger(NSString* address, NSError** error);

/**
 * connect the host to DApp development server
 */
FOUNDATION_EXPORT BOOL PanthalassaConnectToDAppDevHost(NSString* address, NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaDApps(NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaEthAddress(NSError** error);

/**
 * Eth Private key
 */
FOUNDATION_EXPORT NSString* PanthalassaEthPrivateKey(NSError** error);

/**
 * converts an ethereum public key to address
 */
FOUNDATION_EXPORT NSString* PanthalassaEthPubToAddress(NSString* pub, NSError** error);

/**
 * Export the current account store with given password
 */
FOUNDATION_EXPORT NSString* PanthalassaExportAccountStore(NSString* pw, NSString* pwConfirm, NSError** error);

/**
 * fetch the identity public key of the
 */
FOUNDATION_EXPORT NSString* PanthalassaGetIdentityPublicKey(NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaGetMnemonic(NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaIdentityPublicKey(NSError** error);

/**
 * Check if mnemonic is valid
 */
FOUNDATION_EXPORT BOOL PanthalassaIsValidMnemonic(NSString* mne);

FOUNDATION_EXPORT BOOL PanthalassaMarkMessagesAsRead(NSString* partner, NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaMessages(NSString* partner, NSString* startStr, long amount, NSError** error);

/**
 * Creates an new set of encrypted account key's
 */
FOUNDATION_EXPORT NSString* PanthalassaNewAccountKeys(NSString* pw, NSString* pwConfirm, NSError** error);

/**
 * Create new account store from mnemonic
This can e.g. be used in case you need to recover your account
 */
FOUNDATION_EXPORT NSString* PanthalassaNewAccountKeysFromMnemonic(NSString* mne, NSString* pw, NSString* pwConfirm, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaOpenDApp(NSString* id_, NSString* context, NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaRenderMessage(NSString* signingKey, NSString* payload, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaSendMessage(NSString* partner, NSString* message, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaSendResponse(NSString* id_, NSString* data, NSString* responseError, long timeout, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaSetLogger(NSString* level, NSError** error);

FOUNDATION_EXPORT NSString* PanthalassaSignProfile(NSString* name, NSString* location, NSString* image, NSError** error);

/**
 * sign profile
 */
FOUNDATION_EXPORT NSString* PanthalassaSignProfileStandAlone(NSString* name, NSString* location, NSString* image, NSString* keyManagerStore, NSString* password, NSError** error);

/**
 * start panthalassa
 */
FOUNDATION_EXPORT BOOL PanthalassaStart(NSString* dbDir, NSString* config, NSString* password, id<PanthalassaUpStream> client, id<PanthalassaUpStream> uiUpstream, NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaStartDApp(NSString* dAppSingingKeyStr, long timeout, NSError** error);

/**
 * create a new panthalassa instance with the mnemonic
 */
FOUNDATION_EXPORT BOOL PanthalassaStartFromMnemonic(NSString* dbDir, NSString* config, NSString* mnemonic, id<PanthalassaUpStream> client, id<PanthalassaUpStream> uiUpstream, NSError** error);

/**
 * Stop panthalassa
 */
FOUNDATION_EXPORT BOOL PanthalassaStop(NSError** error);

FOUNDATION_EXPORT BOOL PanthalassaStopDApp(NSString* dAppSingingKeyStr, NSError** error);

@class PanthalassaUpStream;

@interface PanthalassaUpStream : NSObject <goSeqRefInterface, PanthalassaUpStream> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (void)send:(NSString*)data;
@end

#endif

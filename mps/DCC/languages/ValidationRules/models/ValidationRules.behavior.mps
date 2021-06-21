<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:6a73f48c-bb7f-40b1-bee0-d645818b3728(ValidationRules.behavior)">
  <persistence version="9" />
  <languages>
    <use id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel" version="18" />
    <use id="af65afd8-f0dd-4942-87d9-63a55f2a9db1" name="jetbrains.mps.lang.behavior" version="2" />
    <use id="5dc5fc0d-37ef-4782-8192-8b5ce1f69f80" name="jetbrains.mps.baseLanguage.extensionMethods" version="0" />
    <devkit ref="fbc25dd2-5da4-483a-8b19-70928e1b62d7(jetbrains.mps.devkit.general-purpose)" />
  </languages>
  <imports>
    <import index="wnbo" ref="r:2c21fbb5-aee1-4a10-8194-bdbbba48550a(ValidationRules.structure)" implicit="true" />
    <import index="c17a" ref="8865b7a8-5271-43d3-884c-6fd1d9cfdd34/java:org.jetbrains.mps.openapi.language(MPS.OpenAPI/)" implicit="true" />
    <import index="wyt6" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.lang(JDK/)" implicit="true" />
  </imports>
  <registry>
    <language id="af65afd8-f0dd-4942-87d9-63a55f2a9db1" name="jetbrains.mps.lang.behavior">
      <concept id="1225194240794" name="jetbrains.mps.lang.behavior.structure.ConceptBehavior" flags="ng" index="13h7C7">
        <reference id="1225194240799" name="concept" index="13h7C2" />
        <child id="1225194240805" name="method" index="13h7CS" />
        <child id="1225194240801" name="constructor" index="13h7CW" />
      </concept>
      <concept id="1225194413805" name="jetbrains.mps.lang.behavior.structure.ConceptConstructorDeclaration" flags="in" index="13hLZK" />
      <concept id="1225194472830" name="jetbrains.mps.lang.behavior.structure.ConceptMethodDeclaration" flags="ng" index="13i0hz" />
      <concept id="1225194691553" name="jetbrains.mps.lang.behavior.structure.ThisNodeExpression" flags="nn" index="13iPFW" />
    </language>
    <language id="5dc5fc0d-37ef-4782-8192-8b5ce1f69f80" name="jetbrains.mps.baseLanguage.extensionMethods">
      <concept id="8022092943110829337" name="jetbrains.mps.baseLanguage.extensionMethods.structure.BaseExtensionMethodContainer" flags="ng" index="a7sou">
        <child id="8022092943110829339" name="methods" index="a7sos" />
      </concept>
      <concept id="1550313277222152185" name="jetbrains.mps.baseLanguage.extensionMethods.structure.ExtensionMethodDeclaration" flags="ng" index="ATzpf" />
      <concept id="1894531970723270160" name="jetbrains.mps.baseLanguage.extensionMethods.structure.TypeExtension" flags="ng" index="KRBjq">
        <child id="1894531970723323134" name="type" index="KRMoO" />
      </concept>
      <concept id="3316739663067157299" name="jetbrains.mps.baseLanguage.extensionMethods.structure.ThisExtensionExpression" flags="nn" index="2V_BSl" />
    </language>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1215693861676" name="jetbrains.mps.baseLanguage.structure.BaseAssignmentExpression" flags="nn" index="d038R">
        <child id="1068498886297" name="rValue" index="37vLTx" />
        <child id="1068498886295" name="lValue" index="37vLTJ" />
      </concept>
      <concept id="1202948039474" name="jetbrains.mps.baseLanguage.structure.InstanceMethodCallOperation" flags="nn" index="liA8E" />
      <concept id="1076505808687" name="jetbrains.mps.baseLanguage.structure.WhileStatement" flags="nn" index="2$JKZl">
        <child id="1076505808688" name="condition" index="2$JKZa" />
      </concept>
      <concept id="1154032098014" name="jetbrains.mps.baseLanguage.structure.AbstractLoopStatement" flags="nn" index="2LF5Ji">
        <child id="1154032183016" name="body" index="2LFqv$" />
      </concept>
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1137021947720" name="jetbrains.mps.baseLanguage.structure.ConceptFunction" flags="in" index="2VMwT0">
        <child id="1137022507850" name="body" index="2VODD2" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1070534370425" name="jetbrains.mps.baseLanguage.structure.IntegerType" flags="in" index="10Oyi0" />
      <concept id="1068431474542" name="jetbrains.mps.baseLanguage.structure.VariableDeclaration" flags="ng" index="33uBYm">
        <child id="1068431790190" name="initializer" index="33vP2m" />
      </concept>
      <concept id="1068498886296" name="jetbrains.mps.baseLanguage.structure.VariableReference" flags="nn" index="37vLTw">
        <reference id="1068581517664" name="variableDeclaration" index="3cqZAo" />
      </concept>
      <concept id="1068498886292" name="jetbrains.mps.baseLanguage.structure.ParameterDeclaration" flags="ir" index="37vLTG" />
      <concept id="1068498886294" name="jetbrains.mps.baseLanguage.structure.AssignmentExpression" flags="nn" index="37vLTI" />
      <concept id="1225271177708" name="jetbrains.mps.baseLanguage.structure.StringType" flags="in" index="17QB3L" />
      <concept id="4972933694980447171" name="jetbrains.mps.baseLanguage.structure.BaseVariableDeclaration" flags="ng" index="19Szcq">
        <child id="5680397130376446158" name="type" index="1tU5fm" />
      </concept>
      <concept id="1068580123132" name="jetbrains.mps.baseLanguage.structure.BaseMethodDeclaration" flags="ng" index="3clF44">
        <child id="1068580123133" name="returnType" index="3clF45" />
        <child id="1068580123134" name="parameter" index="3clF46" />
        <child id="1068580123135" name="body" index="3clF47" />
      </concept>
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068581242875" name="jetbrains.mps.baseLanguage.structure.PlusExpression" flags="nn" index="3cpWs3" />
      <concept id="1068581242878" name="jetbrains.mps.baseLanguage.structure.ReturnStatement" flags="nn" index="3cpWs6">
        <child id="1068581517676" name="expression" index="3cqZAk" />
      </concept>
      <concept id="1068581242864" name="jetbrains.mps.baseLanguage.structure.LocalVariableDeclarationStatement" flags="nn" index="3cpWs8">
        <child id="1068581242865" name="localVariableDeclaration" index="3cpWs9" />
      </concept>
      <concept id="1068581242863" name="jetbrains.mps.baseLanguage.structure.LocalVariableDeclaration" flags="nr" index="3cpWsn" />
      <concept id="1081506773034" name="jetbrains.mps.baseLanguage.structure.LessThanExpression" flags="nn" index="3eOVzh" />
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1178549954367" name="jetbrains.mps.baseLanguage.structure.IVisible" flags="ng" index="1B3ioH">
        <child id="1178549979242" name="visibility" index="1B3o_S" />
      </concept>
      <concept id="1146644602865" name="jetbrains.mps.baseLanguage.structure.PublicVisibility" flags="nn" index="3Tm1VV" />
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1177026924588" name="jetbrains.mps.lang.smodel.structure.RefConcept_Reference" flags="nn" index="chp4Y">
        <reference id="1177026940964" name="conceptDeclaration" index="cht4Q" />
      </concept>
      <concept id="1138411891628" name="jetbrains.mps.lang.smodel.structure.SNodeOperation" flags="nn" index="eCIE_">
        <child id="1144104376918" name="parameter" index="1xVPHs" />
      </concept>
      <concept id="1171407110247" name="jetbrains.mps.lang.smodel.structure.Node_GetAncestorOperation" flags="nn" index="2Xjw5R" />
      <concept id="1144101972840" name="jetbrains.mps.lang.smodel.structure.OperationParm_Concept" flags="ng" index="1xMEDy">
        <child id="1207343664468" name="conceptArgument" index="ri$Ld" />
      </concept>
      <concept id="1138056022639" name="jetbrains.mps.lang.smodel.structure.SPropertyAccess" flags="nn" index="3TrcHB">
        <reference id="1138056395725" name="property" index="3TsBF5" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
  </registry>
  <node concept="13h7C7" id="6ItNp1oonCI">
    <ref role="13h7C2" to="wnbo:6ItNp1oo1qE" resolve="ValidationRule" />
    <node concept="13hLZK" id="6ItNp1oonCJ" role="13h7CW">
      <node concept="3clFbS" id="6ItNp1oonCK" role="2VODD2" />
    </node>
    <node concept="13i0hz" id="6ItNp1oonCT" role="13h7CS">
      <property role="TrG5h" value="ruleId" />
      <node concept="3Tm1VV" id="6ItNp1oonCU" role="1B3o_S" />
      <node concept="17QB3L" id="6ItNp1oonD5" role="3clF45" />
      <node concept="3clFbS" id="6ItNp1oonCW" role="3clF47">
        <node concept="3clFbF" id="6ItNp1oonDC" role="3cqZAp">
          <node concept="3cpWs3" id="6ItNp1ooqi4" role="3clFbG">
            <node concept="2OqwBi" id="6ItNp1ooqTw" role="3uHU7w">
              <node concept="13iPFW" id="6ItNp1ooqC$" role="2Oq$k0" />
              <node concept="3TrcHB" id="6ItNp1oor7B" role="2OqNvi">
                <ref role="3TsBF5" to="wnbo:6ItNp1oo1rI" resolve="sequenceNumber" />
              </node>
            </node>
            <node concept="3cpWs3" id="6ItNp1ooqeH" role="3uHU7B">
              <node concept="3cpWs3" id="6ItNp1oooGn" role="3uHU7B">
                <node concept="3cpWs3" id="6ItNp1oooy9" role="3uHU7B">
                  <node concept="2OqwBi" id="6ItNp1ooo3B" role="3uHU7B">
                    <node concept="2OqwBi" id="6ItNp1oonKS" role="2Oq$k0">
                      <node concept="13iPFW" id="6ItNp1oonDB" role="2Oq$k0" />
                      <node concept="3TrcHB" id="6ItNp1oonSu" role="2OqNvi">
                        <ref role="3TsBF5" to="wnbo:6ItNp1oo1rH" resolve="type" />
                      </node>
                    </node>
                    <node concept="liA8E" id="6ItNp1ooobE" role="2OqNvi">
                      <ref role="37wK5l" to="c17a:~SEnumerationLiteral.getName()" resolve="getName" />
                    </node>
                  </node>
                  <node concept="Xl_RD" id="6ItNp1oooyc" role="3uHU7w">
                    <property role="Xl_RC" value="-" />
                  </node>
                </node>
                <node concept="2OqwBi" id="6ItNp1oopPc" role="3uHU7w">
                  <node concept="2OqwBi" id="6ItNp1oopyp" role="2Oq$k0">
                    <node concept="2OqwBi" id="6ItNp1oooWJ" role="2Oq$k0">
                      <node concept="13iPFW" id="6ItNp1oooGq" role="2Oq$k0" />
                      <node concept="2Xjw5R" id="6ItNp1oopf5" role="2OqNvi">
                        <node concept="1xMEDy" id="6ItNp1oopf7" role="1xVPHs">
                          <node concept="chp4Y" id="6ItNp1oopkv" role="ri$Ld">
                            <ref role="cht4Q" to="wnbo:6ItNp1oo1qC" resolve="ValidationRules" />
                          </node>
                        </node>
                      </node>
                    </node>
                    <node concept="3TrcHB" id="6ItNp1oopG$" role="2OqNvi">
                      <ref role="3TsBF5" to="wnbo:6ItNp1oo1qD" resolve="memberState" />
                    </node>
                  </node>
                  <node concept="liA8E" id="6ItNp1ooq01" role="2OqNvi">
                    <ref role="37wK5l" to="c17a:~SEnumerationLiteral.getName()" resolve="getName" />
                  </node>
                </node>
              </node>
              <node concept="Xl_RD" id="6ItNp1ooqeK" role="3uHU7w">
                <property role="Xl_RC" value="-" />
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
  </node>
  <node concept="KRBjq" id="6ItNp1ooqmD">
    <property role="TrG5h" value="utils" />
    <node concept="10Oyi0" id="6ItNp1ooqBM" role="KRMoO" />
    <node concept="ATzpf" id="6ItNp1ooqmI" role="a7sos">
      <property role="TrG5h" value="leftPad0" />
      <node concept="37vLTG" id="6ItNp1ooqns" role="3clF46">
        <property role="TrG5h" value="nPlaces" />
        <node concept="10Oyi0" id="6ItNp1ooqnO" role="1tU5fm" />
      </node>
      <node concept="3Tm1VV" id="6ItNp1ooqmJ" role="1B3o_S" />
      <node concept="17QB3L" id="6ItNp1ooqmU" role="3clF45" />
      <node concept="3clFbS" id="6ItNp1ooqmL" role="3clF47">
        <node concept="3cpWs8" id="6ItNp1ooy9a" role="3cqZAp">
          <node concept="3cpWsn" id="6ItNp1ooy9b" role="3cpWs9">
            <property role="TrG5h" value="str" />
            <node concept="17QB3L" id="6ItNp1ooyg$" role="1tU5fm" />
            <node concept="3cpWs3" id="6ItNp1ooyfR" role="33vP2m">
              <node concept="2V_BSl" id="6ItNp1ooyfU" role="3uHU7w" />
              <node concept="Xl_RD" id="6ItNp1ooyb3" role="3uHU7B">
                <property role="Xl_RC" value="" />
              </node>
            </node>
          </node>
        </node>
        <node concept="2$JKZl" id="6ItNp1ooymc" role="3cqZAp">
          <node concept="3clFbS" id="6ItNp1ooyme" role="2LFqv$">
            <node concept="3clFbF" id="6ItNp1oo$2N" role="3cqZAp">
              <node concept="37vLTI" id="6ItNp1oo$eA" role="3clFbG">
                <node concept="3cpWs3" id="6ItNp1oo$_G" role="37vLTx">
                  <node concept="37vLTw" id="6ItNp1oo$L$" role="3uHU7w">
                    <ref role="3cqZAo" node="6ItNp1ooy9b" resolve="str" />
                  </node>
                  <node concept="Xl_RD" id="6ItNp1oo$fv" role="3uHU7B">
                    <property role="Xl_RC" value="0" />
                  </node>
                </node>
                <node concept="37vLTw" id="6ItNp1oo$2M" role="37vLTJ">
                  <ref role="3cqZAo" node="6ItNp1ooy9b" resolve="str" />
                </node>
              </node>
            </node>
          </node>
          <node concept="3eOVzh" id="6ItNp1oozUm" role="2$JKZa">
            <node concept="37vLTw" id="6ItNp1oozVo" role="3uHU7w">
              <ref role="3cqZAo" node="6ItNp1ooqns" resolve="nPlaces" />
            </node>
            <node concept="2OqwBi" id="6ItNp1ooyKq" role="3uHU7B">
              <node concept="37vLTw" id="6ItNp1ooymI" role="2Oq$k0">
                <ref role="3cqZAo" node="6ItNp1ooy9b" resolve="str" />
              </node>
              <node concept="liA8E" id="6ItNp1ooz4$" role="2OqNvi">
                <ref role="37wK5l" to="wyt6:~String.length()" resolve="length" />
              </node>
            </node>
          </node>
        </node>
        <node concept="3cpWs6" id="6ItNp1oo$MO" role="3cqZAp">
          <node concept="37vLTw" id="6ItNp1oo$MS" role="3cqZAk">
            <ref role="3cqZAo" node="6ItNp1ooy9b" resolve="str" />
          </node>
        </node>
      </node>
    </node>
  </node>
</model>


<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:4fcdbef1-dddb-4751-9284-d4a42ed44f1b(ValidationRules.typesystem)">
  <persistence version="9" />
  <languages>
    <use id="7a5dda62-9140-4668-ab76-d5ed1746f2b2" name="jetbrains.mps.lang.typesystem" version="5" />
    <devkit ref="00000000-0000-4000-0000-1de82b3a4936(jetbrains.mps.devkit.aspect.typesystem)" />
  </languages>
  <imports>
    <import index="wnbo" ref="r:2c21fbb5-aee1-4a10-8194-bdbbba48550a(ValidationRules.structure)" implicit="true" />
    <import index="8ggg" ref="r:6a73f48c-bb7f-40b1-bee0-d645818b3728(ValidationRules.behavior)" implicit="true" />
    <import index="wyt6" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.lang(JDK/)" implicit="true" />
  </imports>
  <registry>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="4836112446988635817" name="jetbrains.mps.baseLanguage.structure.UndefinedType" flags="in" index="2jxLKc" />
      <concept id="1202948039474" name="jetbrains.mps.baseLanguage.structure.InstanceMethodCallOperation" flags="nn" index="liA8E" />
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1068498886296" name="jetbrains.mps.baseLanguage.structure.VariableReference" flags="nn" index="37vLTw">
        <reference id="1068581517664" name="variableDeclaration" index="3cqZAo" />
      </concept>
      <concept id="4972933694980447171" name="jetbrains.mps.baseLanguage.structure.BaseVariableDeclaration" flags="ng" index="19Szcq">
        <child id="5680397130376446158" name="type" index="1tU5fm" />
      </concept>
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123159" name="jetbrains.mps.baseLanguage.structure.IfStatement" flags="nn" index="3clFbJ">
        <child id="1068580123160" name="condition" index="3clFbw" />
        <child id="1068580123161" name="ifTrue" index="3clFbx" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
        <child id="1068499141038" name="actualArgument" index="37wK5m" />
      </concept>
    </language>
    <language id="fd392034-7849-419d-9071-12563d152375" name="jetbrains.mps.baseLanguage.closures">
      <concept id="1199569711397" name="jetbrains.mps.baseLanguage.closures.structure.ClosureLiteral" flags="nn" index="1bVj0M">
        <child id="1199569906740" name="parameter" index="1bW2Oz" />
        <child id="1199569916463" name="body" index="1bW5cS" />
      </concept>
    </language>
    <language id="7a5dda62-9140-4668-ab76-d5ed1746f2b2" name="jetbrains.mps.lang.typesystem">
      <concept id="1175517767210" name="jetbrains.mps.lang.typesystem.structure.ReportErrorStatement" flags="nn" index="2MkqsV">
        <child id="1175517851849" name="errorString" index="2MkJ7o" />
      </concept>
      <concept id="1195213580585" name="jetbrains.mps.lang.typesystem.structure.AbstractCheckingRule" flags="ig" index="18hYwZ">
        <child id="1195213635060" name="body" index="18ibNy" />
      </concept>
      <concept id="1195214364922" name="jetbrains.mps.lang.typesystem.structure.NonTypesystemRule" flags="ig" index="18kY7G" />
      <concept id="3937244445246642777" name="jetbrains.mps.lang.typesystem.structure.AbstractReportStatement" flags="ng" index="1urrMJ">
        <child id="3937244445246642781" name="nodeToReport" index="1urrMF" />
      </concept>
      <concept id="1174642788531" name="jetbrains.mps.lang.typesystem.structure.ConceptReference" flags="ig" index="1YaCAy">
        <reference id="1174642800329" name="concept" index="1YaFvo" />
      </concept>
      <concept id="1174648085619" name="jetbrains.mps.lang.typesystem.structure.AbstractRule" flags="ng" index="1YuPPy">
        <child id="1174648101952" name="applicableNode" index="1YuTPh" />
      </concept>
      <concept id="1174650418652" name="jetbrains.mps.lang.typesystem.structure.ApplicableNodeReference" flags="nn" index="1YBJjd">
        <reference id="1174650432090" name="applicableNode" index="1YBMHb" />
      </concept>
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1177026924588" name="jetbrains.mps.lang.smodel.structure.RefConcept_Reference" flags="nn" index="chp4Y">
        <reference id="1177026940964" name="conceptDeclaration" index="cht4Q" />
      </concept>
      <concept id="1179409122411" name="jetbrains.mps.lang.smodel.structure.Node_ConceptMethodCall" flags="nn" index="2qgKlT" />
      <concept id="4693937538533521280" name="jetbrains.mps.lang.smodel.structure.OfConceptOperation" flags="ng" index="v3k3i">
        <child id="4693937538533538124" name="requestedConcept" index="v3oSu" />
      </concept>
      <concept id="1145573345940" name="jetbrains.mps.lang.smodel.structure.Node_GetAllSiblingsOperation" flags="nn" index="2TvwIu" />
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
    <language id="83888646-71ce-4f1c-9c53-c54016f6ad4f" name="jetbrains.mps.baseLanguage.collections">
      <concept id="1204796164442" name="jetbrains.mps.baseLanguage.collections.structure.InternalSequenceOperation" flags="nn" index="23sCx2">
        <child id="1204796294226" name="closure" index="23t8la" />
      </concept>
      <concept id="1235566554328" name="jetbrains.mps.baseLanguage.collections.structure.AnyOperation" flags="nn" index="2HwmR7" />
      <concept id="1203518072036" name="jetbrains.mps.baseLanguage.collections.structure.SmartClosureParameterDeclaration" flags="ig" index="Rh6nW" />
    </language>
  </registry>
  <node concept="18kY7G" id="55O0TMOsHwi">
    <property role="TrG5h" value="check_ValidationRule" />
    <node concept="3clFbS" id="55O0TMOsHwj" role="18ibNy">
      <node concept="3clFbJ" id="55O0TMOsHK0" role="3cqZAp">
        <node concept="2OqwBi" id="55O0TMOsNLN" role="3clFbw">
          <node concept="2OqwBi" id="55O0TMOsJ5Z" role="2Oq$k0">
            <node concept="2OqwBi" id="55O0TMOsHUJ" role="2Oq$k0">
              <node concept="1YBJjd" id="55O0TMOsHKc" role="2Oq$k0">
                <ref role="1YBMHb" node="55O0TMOsHwl" resolve="validationRule" />
              </node>
              <node concept="2TvwIu" id="55O0TMOsI2u" role="2OqNvi" />
            </node>
            <node concept="v3k3i" id="55O0TMOsNxw" role="2OqNvi">
              <node concept="chp4Y" id="55O0TMOsNy_" role="v3oSu">
                <ref role="cht4Q" to="wnbo:6ItNp1oo1qE" resolve="ValidationRule" />
              </node>
            </node>
          </node>
          <node concept="2HwmR7" id="55O0TMOsO0j" role="2OqNvi">
            <node concept="1bVj0M" id="55O0TMOsO0l" role="23t8la">
              <node concept="3clFbS" id="55O0TMOsO0m" role="1bW5cS">
                <node concept="3clFbF" id="55O0TMOsO4i" role="3cqZAp">
                  <node concept="2OqwBi" id="55O0TMOt1l8" role="3clFbG">
                    <node concept="2OqwBi" id="55O0TMOsOhi" role="2Oq$k0">
                      <node concept="37vLTw" id="55O0TMOsO4h" role="2Oq$k0">
                        <ref role="3cqZAo" node="55O0TMOsO0n" resolve="it" />
                      </node>
                      <node concept="2qgKlT" id="55O0TMOsOvO" role="2OqNvi">
                        <ref role="37wK5l" to="8ggg:6ItNp1oonCT" resolve="ruleId" />
                      </node>
                    </node>
                    <node concept="liA8E" id="55O0TMOt1FH" role="2OqNvi">
                      <ref role="37wK5l" to="wyt6:~String.equals(java.lang.Object)" resolve="equals" />
                      <node concept="2OqwBi" id="55O0TMOt2kK" role="37wK5m">
                        <node concept="1YBJjd" id="55O0TMOt21q" role="2Oq$k0">
                          <ref role="1YBMHb" node="55O0TMOsHwl" resolve="validationRule" />
                        </node>
                        <node concept="2qgKlT" id="55O0TMOt2vU" role="2OqNvi">
                          <ref role="37wK5l" to="8ggg:6ItNp1oonCT" resolve="ruleId" />
                        </node>
                      </node>
                    </node>
                  </node>
                </node>
              </node>
              <node concept="Rh6nW" id="55O0TMOsO0n" role="1bW2Oz">
                <property role="TrG5h" value="it" />
                <node concept="2jxLKc" id="55O0TMOsO0o" role="1tU5fm" />
              </node>
            </node>
          </node>
        </node>
        <node concept="3clFbS" id="55O0TMOsHK2" role="3clFbx">
          <node concept="2MkqsV" id="55O0TMOsQn_" role="3cqZAp">
            <node concept="Xl_RD" id="55O0TMOsQnL" role="2MkJ7o">
              <property role="Xl_RC" value="Every rule's ID must be unique, but this one's not" />
            </node>
            <node concept="1YBJjd" id="55O0TMOsQoM" role="1urrMF">
              <ref role="1YBMHb" node="55O0TMOsHwl" resolve="validationRule" />
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="1YaCAy" id="55O0TMOsHwl" role="1YuTPh">
      <property role="TrG5h" value="validationRule" />
      <ref role="1YaFvo" to="wnbo:6ItNp1oo1qE" resolve="ValidationRule" />
    </node>
  </node>
</model>


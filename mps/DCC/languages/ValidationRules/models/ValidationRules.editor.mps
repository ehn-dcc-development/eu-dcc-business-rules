<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:1f6d3187-b305-4cb0-913f-c9a417d19443(ValidationRules.editor)">
  <persistence version="9" />
  <languages>
    <use id="18bc6592-03a6-4e29-a83a-7ff23bde13ba" name="jetbrains.mps.lang.editor" version="14" />
    <use id="aee9cad2-acd4-4608-aef2-0004f6a1cdbd" name="jetbrains.mps.lang.actions" version="4" />
    <devkit ref="fbc25dd2-5da4-483a-8b19-70928e1b62d7(jetbrains.mps.devkit.general-purpose)" />
  </languages>
  <imports>
    <import index="wnbo" ref="r:2c21fbb5-aee1-4a10-8194-bdbbba48550a(BusinessRules.structure)" implicit="true" />
    <import index="tpck" ref="r:00000000-0000-4000-0000-011c89590288(jetbrains.mps.lang.core.structure)" implicit="true" />
    <import index="c17a" ref="8865b7a8-5271-43d3-884c-6fd1d9cfdd34/java:org.jetbrains.mps.openapi.language(MPS.OpenAPI/)" implicit="true" />
    <import index="8ggg" ref="r:6a73f48c-bb7f-40b1-bee0-d645818b3728(ValidationRules.behavior)" implicit="true" />
  </imports>
  <registry>
    <language id="18bc6592-03a6-4e29-a83a-7ff23bde13ba" name="jetbrains.mps.lang.editor">
      <concept id="1071666914219" name="jetbrains.mps.lang.editor.structure.ConceptEditorDeclaration" flags="ig" index="24kQdi">
        <child id="1078153129734" name="inspectedCellModel" index="6VMZX" />
      </concept>
      <concept id="1140524381322" name="jetbrains.mps.lang.editor.structure.CellModel_ListWithRole" flags="ng" index="2czfm3">
        <child id="1140524464360" name="cellLayout" index="2czzBx" />
      </concept>
      <concept id="1106270549637" name="jetbrains.mps.lang.editor.structure.CellLayout_Horizontal" flags="nn" index="2iRfu4" />
      <concept id="1106270571710" name="jetbrains.mps.lang.editor.structure.CellLayout_Vertical" flags="nn" index="2iRkQZ" />
      <concept id="1142886811589" name="jetbrains.mps.lang.editor.structure.ConceptFunctionParameter_node" flags="nn" index="pncrf" />
      <concept id="1080736578640" name="jetbrains.mps.lang.editor.structure.BaseEditorComponent" flags="ig" index="2wURMF">
        <child id="1080736633877" name="cellModel" index="2wV5jI" />
      </concept>
      <concept id="1239814640496" name="jetbrains.mps.lang.editor.structure.CellLayout_VerticalGrid" flags="nn" index="2EHx9g" />
      <concept id="1186403751766" name="jetbrains.mps.lang.editor.structure.FontStyleStyleClassItem" flags="ln" index="Vb9p2">
        <property id="1186403771423" name="style" index="Vbekb" />
      </concept>
      <concept id="1186414536763" name="jetbrains.mps.lang.editor.structure.BooleanStyleSheetItem" flags="ln" index="VOi$J">
        <property id="1186414551515" name="flag" index="VOm3f" />
      </concept>
      <concept id="1186414928363" name="jetbrains.mps.lang.editor.structure.SelectableStyleSheetItem" flags="ln" index="VPM3Z" />
      <concept id="1186414976055" name="jetbrains.mps.lang.editor.structure.DrawBorderStyleClassItem" flags="ln" index="VPXOz" />
      <concept id="1233758997495" name="jetbrains.mps.lang.editor.structure.PunctuationLeftStyleClassItem" flags="ln" index="11L4FC" />
      <concept id="1233759184865" name="jetbrains.mps.lang.editor.structure.PunctuationRightStyleClassItem" flags="ln" index="11LMrY" />
      <concept id="1139848536355" name="jetbrains.mps.lang.editor.structure.CellModel_WithRole" flags="ng" index="1$h60E">
        <property id="1140114345053" name="allowEmptyText" index="1O74Pk" />
        <reference id="1140103550593" name="relationDeclaration" index="1NtTu8" />
      </concept>
      <concept id="1073389446423" name="jetbrains.mps.lang.editor.structure.CellModel_Collection" flags="sn" stub="3013115976261988961" index="3EZMnI">
        <child id="1106270802874" name="cellLayout" index="2iSdaV" />
        <child id="1073389446424" name="childCellModel" index="3EZMnx" />
      </concept>
      <concept id="1073389577006" name="jetbrains.mps.lang.editor.structure.CellModel_Constant" flags="sn" stub="3610246225209162225" index="3F0ifn">
        <property id="1073389577007" name="text" index="3F0ifm" />
      </concept>
      <concept id="1073389658414" name="jetbrains.mps.lang.editor.structure.CellModel_Property" flags="sg" stub="730538219796134133" index="3F0A7n" />
      <concept id="1219418625346" name="jetbrains.mps.lang.editor.structure.IStyleContainer" flags="ng" index="3F0Thp">
        <child id="1219418656006" name="styleItem" index="3F10Kt" />
      </concept>
      <concept id="1073389882823" name="jetbrains.mps.lang.editor.structure.CellModel_RefNode" flags="sg" stub="730538219795960754" index="3F1sOY" />
      <concept id="1073390211982" name="jetbrains.mps.lang.editor.structure.CellModel_RefNodeList" flags="sg" stub="2794558372793454595" index="3F2HdR" />
      <concept id="1225898583838" name="jetbrains.mps.lang.editor.structure.ReadOnlyModelAccessor" flags="ng" index="1HfYo3">
        <child id="1225898971709" name="getter" index="1Hhtcw" />
      </concept>
      <concept id="1225900081164" name="jetbrains.mps.lang.editor.structure.CellModel_ReadOnlyModelAccessor" flags="sg" stub="3708815482283559694" index="1HlG4h">
        <child id="1225900141900" name="modelAccessor" index="1HlULh" />
      </concept>
      <concept id="1176717841777" name="jetbrains.mps.lang.editor.structure.QueryFunction_ModelAccess_Getter" flags="in" index="3TQlhw" />
      <concept id="1198256887712" name="jetbrains.mps.lang.editor.structure.CellModel_Indent" flags="ng" index="3XFhqQ" />
      <concept id="1166049232041" name="jetbrains.mps.lang.editor.structure.AbstractComponent" flags="ng" index="1XWOmA">
        <reference id="1166049300910" name="conceptDeclaration" index="1XX52x" />
      </concept>
    </language>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1202948039474" name="jetbrains.mps.baseLanguage.structure.InstanceMethodCallOperation" flags="nn" index="liA8E" />
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
      <concept id="1070534058343" name="jetbrains.mps.baseLanguage.structure.NullLiteral" flags="nn" index="10Nm6u" />
      <concept id="1068580123152" name="jetbrains.mps.baseLanguage.structure.EqualsExpression" flags="nn" index="3clFbC" />
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1163668896201" name="jetbrains.mps.baseLanguage.structure.TernaryOperatorExpression" flags="nn" index="3K4zz7">
        <child id="1163668914799" name="condition" index="3K4Cdx" />
        <child id="1163668922816" name="ifTrue" index="3K4E3e" />
        <child id="1163668934364" name="ifFalse" index="3K4GZi" />
      </concept>
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1177026924588" name="jetbrains.mps.lang.smodel.structure.RefConcept_Reference" flags="nn" index="chp4Y">
        <reference id="1177026940964" name="conceptDeclaration" index="cht4Q" />
      </concept>
      <concept id="1138411891628" name="jetbrains.mps.lang.smodel.structure.SNodeOperation" flags="nn" index="eCIE_">
        <child id="1144104376918" name="parameter" index="1xVPHs" />
      </concept>
      <concept id="1179409122411" name="jetbrains.mps.lang.smodel.structure.Node_ConceptMethodCall" flags="nn" index="2qgKlT" />
      <concept id="1171407110247" name="jetbrains.mps.lang.smodel.structure.Node_GetAncestorOperation" flags="nn" index="2Xjw5R" />
      <concept id="1144101972840" name="jetbrains.mps.lang.smodel.structure.OperationParm_Concept" flags="ng" index="1xMEDy">
        <child id="1207343664468" name="conceptArgument" index="ri$Ld" />
      </concept>
      <concept id="1138056022639" name="jetbrains.mps.lang.smodel.structure.SPropertyAccess" flags="nn" index="3TrcHB">
        <reference id="1138056395725" name="property" index="3TsBF5" />
      </concept>
    </language>
  </registry>
  <node concept="24kQdi" id="6ItNp1oo1rb">
    <ref role="1XX52x" to="wnbo:6ItNp1oo1qC" resolve="ValidationRules" />
    <node concept="3EZMnI" id="6ItNp1oo1rf" role="2wV5jI">
      <node concept="3EZMnI" id="6ItNp1oo1rj" role="3EZMnx">
        <node concept="VPM3Z" id="6ItNp1oo1rl" role="3F10Kt" />
        <node concept="3F0ifn" id="6ItNp1oo1rn" role="3EZMnx">
          <property role="3F0ifm" value="validation rules" />
        </node>
        <node concept="3F0A7n" id="6ItNp1oo1rq" role="3EZMnx">
          <ref role="1NtTu8" to="tpck:h0TrG11" resolve="name" />
        </node>
        <node concept="3F0ifn" id="6ItNp1oo1rt" role="3EZMnx">
          <property role="3F0ifm" value="for" />
        </node>
        <node concept="3F0A7n" id="6ItNp1oo1ry" role="3EZMnx">
          <ref role="1NtTu8" to="wnbo:6ItNp1oo1qD" resolve="memberState" />
        </node>
        <node concept="2iRfu4" id="6ItNp1oo1ro" role="2iSdaV" />
      </node>
      <node concept="3F0ifn" id="6ItNp1oo1r$" role="3EZMnx" />
      <node concept="3EZMnI" id="6ItNp1oo1rA" role="3EZMnx">
        <node concept="VPM3Z" id="6ItNp1oo1rC" role="3F10Kt" />
        <node concept="3F2HdR" id="6ItNp1oo1sC" role="3EZMnx">
          <ref role="1NtTu8" to="wnbo:6ItNp1oo1rG" resolve="rules" />
          <node concept="2EHx9g" id="6ItNp1oo1sF" role="2czzBx" />
        </node>
        <node concept="2iRkQZ" id="6ItNp1oo1rF" role="2iSdaV" />
      </node>
      <node concept="2iRkQZ" id="6ItNp1oo1ri" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="6ItNp1oo1sA">
    <ref role="1XX52x" to="wnbo:6ItNp1oo1qE" resolve="ValidationRule" />
    <node concept="3EZMnI" id="51wT2RozWLz" role="2wV5jI">
      <node concept="3EZMnI" id="51wT2RozWMf" role="3EZMnx">
        <node concept="VPM3Z" id="51wT2RozWMh" role="3F10Kt" />
        <node concept="3F0ifn" id="51wT2RozWMl" role="3EZMnx">
          <property role="3F0ifm" value="rule" />
        </node>
        <node concept="3EZMnI" id="51wT2RozWYS" role="3EZMnx">
          <node concept="VPM3Z" id="51wT2RozWYU" role="3F10Kt" />
          <node concept="1HlG4h" id="6ItNp1oo1sS" role="3EZMnx">
            <node concept="1HfYo3" id="6ItNp1oo1sU" role="1HlULh">
              <node concept="3TQlhw" id="6ItNp1oo1sW" role="1Hhtcw">
                <node concept="3clFbS" id="6ItNp1oo1sY" role="2VODD2">
                  <node concept="3clFbF" id="6ItNp1oobc9" role="3cqZAp">
                    <node concept="3K4zz7" id="6ItNp1oocc_" role="3clFbG">
                      <node concept="Xl_RD" id="6ItNp1oocdT" role="3K4E3e">
                        <property role="Xl_RC" value="&lt;rule type&gt;" />
                      </node>
                      <node concept="2OqwBi" id="6ItNp1oodY5" role="3K4GZi">
                        <node concept="2OqwBi" id="6ItNp1oocOC" role="2Oq$k0">
                          <node concept="pncrf" id="6ItNp1oocgo" role="2Oq$k0" />
                          <node concept="3TrcHB" id="6ItNp1oodln" role="2OqNvi">
                            <ref role="3TsBF5" to="wnbo:6ItNp1oo1rH" resolve="type" />
                          </node>
                        </node>
                        <node concept="liA8E" id="6ItNp1ooe8L" role="2OqNvi">
                          <ref role="37wK5l" to="c17a:~SEnumerationLiteral.getName()" resolve="getName" />
                        </node>
                      </node>
                      <node concept="3clFbC" id="6ItNp1oobVM" role="3K4Cdx">
                        <node concept="10Nm6u" id="6ItNp1oocbj" role="3uHU7w" />
                        <node concept="2OqwBi" id="6ItNp1oobsn" role="3uHU7B">
                          <node concept="pncrf" id="6ItNp1oobc8" role="2Oq$k0" />
                          <node concept="3TrcHB" id="6ItNp1oobAw" role="2OqNvi">
                            <ref role="3TsBF5" to="wnbo:6ItNp1oo1rH" resolve="type" />
                          </node>
                        </node>
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
            <node concept="Vb9p2" id="55O0TMOsl2f" role="3F10Kt">
              <property role="Vbekb" value="g1_kEg4/ITALIC" />
            </node>
          </node>
          <node concept="3F0ifn" id="6ItNp1oo2io" role="3EZMnx">
            <property role="3F0ifm" value="-" />
            <node concept="11L4FC" id="51wT2Ro$5Ex" role="3F10Kt">
              <property role="VOm3f" value="true" />
            </node>
            <node concept="11LMrY" id="51wT2Ro$9EI" role="3F10Kt">
              <property role="VOm3f" value="true" />
            </node>
          </node>
          <node concept="1HlG4h" id="6ItNp1oo2jV" role="3EZMnx">
            <node concept="1HfYo3" id="6ItNp1oo2jX" role="1HlULh">
              <node concept="3TQlhw" id="6ItNp1oo2jZ" role="1Hhtcw">
                <node concept="3clFbS" id="6ItNp1oo2k1" role="2VODD2">
                  <node concept="3clFbF" id="6ItNp1oo2l7" role="3cqZAp">
                    <node concept="2OqwBi" id="6ItNp1oo3bt" role="3clFbG">
                      <node concept="2OqwBi" id="6ItNp1oo2Mp" role="2Oq$k0">
                        <node concept="2OqwBi" id="6ItNp1oo2ly" role="2Oq$k0">
                          <node concept="pncrf" id="6ItNp1oo2l6" role="2Oq$k0" />
                          <node concept="2Xjw5R" id="6ItNp1oo2ne" role="2OqNvi">
                            <node concept="1xMEDy" id="6ItNp1oo2ng" role="1xVPHs">
                              <node concept="chp4Y" id="6ItNp1oo2_9" role="ri$Ld">
                                <ref role="cht4Q" to="wnbo:6ItNp1oo1qC" resolve="ValidationRules" />
                              </node>
                            </node>
                          </node>
                        </node>
                        <node concept="3TrcHB" id="6ItNp1oo33f" role="2OqNvi">
                          <ref role="3TsBF5" to="wnbo:6ItNp1oo1qD" resolve="memberState" />
                        </node>
                      </node>
                      <node concept="liA8E" id="6ItNp1oo3ob" role="2OqNvi">
                        <ref role="37wK5l" to="c17a:~SEnumerationLiteral.getName()" resolve="getName" />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
            <node concept="Vb9p2" id="55O0TMOssJq" role="3F10Kt">
              <property role="Vbekb" value="g1_kEg4/ITALIC" />
            </node>
          </node>
          <node concept="3F0ifn" id="6ItNp1oo3Dx" role="3EZMnx">
            <property role="3F0ifm" value="-" />
            <node concept="11L4FC" id="51wT2Ro$9EK" role="3F10Kt">
              <property role="VOm3f" value="true" />
            </node>
            <node concept="11LMrY" id="51wT2Ro$9EM" role="3F10Kt">
              <property role="VOm3f" value="true" />
            </node>
          </node>
          <node concept="3F0A7n" id="6ItNp1oo54d" role="3EZMnx">
            <ref role="1NtTu8" to="wnbo:6ItNp1oo1rI" resolve="sequenceNumber" />
          </node>
          <node concept="2iRfu4" id="51wT2RozWYX" role="2iSdaV" />
        </node>
        <node concept="2iRfu4" id="51wT2RozWMk" role="2iSdaV" />
      </node>
      <node concept="3EZMnI" id="51wT2RozY3h" role="3EZMnx">
        <node concept="VPM3Z" id="51wT2RozY3j" role="3F10Kt" />
        <node concept="3XFhqQ" id="51wT2RozY5C" role="3EZMnx" />
        <node concept="3EZMnI" id="51wT2RozY5F" role="3EZMnx">
          <node concept="VPM3Z" id="51wT2RozY5H" role="3F10Kt" />
          <node concept="3EZMnI" id="51wT2RozXqJ" role="3EZMnx">
            <node concept="VPM3Z" id="51wT2RozXqL" role="3F10Kt" />
            <node concept="3F0ifn" id="51wT2RozXqN" role="3EZMnx">
              <property role="3F0ifm" value="type:" />
            </node>
            <node concept="3F0A7n" id="6ItNp1oo5n7" role="3EZMnx">
              <ref role="1NtTu8" to="wnbo:6ItNp1oo1rH" resolve="type" />
            </node>
            <node concept="2iRfu4" id="51wT2RozXqO" role="2iSdaV" />
          </node>
          <node concept="3EZMnI" id="51wT2RozXGz" role="3EZMnx">
            <node concept="VPM3Z" id="51wT2RozXG_" role="3F10Kt" />
            <node concept="3F0ifn" id="51wT2RozXGB" role="3EZMnx">
              <property role="3F0ifm" value="business description:" />
            </node>
            <node concept="3F0A7n" id="6ItNp1oo5E1" role="3EZMnx">
              <property role="1O74Pk" value="true" />
              <ref role="1NtTu8" to="wnbo:6ItNp1oo1s9" resolve="businessDescription" />
            </node>
            <node concept="2iRfu4" id="51wT2RozXGC" role="2iSdaV" />
          </node>
          <node concept="3EZMnI" id="51wT2RozXNu" role="3EZMnx">
            <node concept="VPM3Z" id="51wT2RozXNw" role="3F10Kt" />
            <node concept="3F0ifn" id="51wT2RozXNy" role="3EZMnx">
              <property role="3F0ifm" value="description:" />
            </node>
            <node concept="3F0A7n" id="6ItNp1oo5Mw" role="3EZMnx">
              <ref role="1NtTu8" to="wnbo:6ItNp1oo1sa" resolve="description" />
            </node>
            <node concept="2iRfu4" id="51wT2RozXNz" role="2iSdaV" />
          </node>
          <node concept="3EZMnI" id="51wT2RozY83" role="3EZMnx">
            <node concept="VPM3Z" id="51wT2RozY85" role="3F10Kt" />
            <node concept="3F0ifn" id="51wT2RozY87" role="3EZMnx">
              <property role="3F0ifm" value="input parameter description:" />
            </node>
            <node concept="3F0A7n" id="51wT2RozY8a" role="3EZMnx">
              <property role="1O74Pk" value="true" />
              <ref role="1NtTu8" to="wnbo:6ItNp1oo1sb" resolve="inputParameterDescription" />
            </node>
            <node concept="2iRfu4" id="51wT2RozY88" role="2iSdaV" />
          </node>
          <node concept="3EZMnI" id="51wT2RozY8d" role="3EZMnx">
            <node concept="VPM3Z" id="51wT2RozY8f" role="3F10Kt" />
            <node concept="3F0ifn" id="51wT2RozY8h" role="3EZMnx">
              <property role="3F0ifm" value="CertLogic rule:" />
            </node>
            <node concept="2iRfu4" id="51wT2RozY8i" role="2iSdaV" />
          </node>
          <node concept="3EZMnI" id="51wT2Ro__1S" role="3EZMnx">
            <node concept="VPM3Z" id="51wT2Ro__1U" role="3F10Kt" />
            <node concept="3XFhqQ" id="51wT2Ro__1Y" role="3EZMnx" />
            <node concept="3F1sOY" id="51wT2Ro__21" role="3EZMnx">
              <ref role="1NtTu8" to="wnbo:51wT2RozYjx" resolve="certLogicExpression" />
              <node concept="VPXOz" id="51wT2RoEl1N" role="3F10Kt">
                <property role="VOm3f" value="true" />
              </node>
            </node>
            <node concept="2iRfu4" id="51wT2Ro__1X" role="2iSdaV" />
          </node>
          <node concept="2iRkQZ" id="51wT2RozY5K" role="2iSdaV" />
        </node>
        <node concept="2iRfu4" id="51wT2RozY3m" role="2iSdaV" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro_xwf" role="3EZMnx" />
      <node concept="2iRkQZ" id="51wT2RozWLA" role="2iSdaV" />
    </node>
    <node concept="3EZMnI" id="55O0TMOsSvH" role="6VMZX">
      <node concept="2iRfu4" id="55O0TMOsSvI" role="2iSdaV" />
      <node concept="3F0ifn" id="55O0TMOsS$6" role="3EZMnx">
        <property role="3F0ifm" value="rule id:" />
      </node>
      <node concept="1HlG4h" id="55O0TMOsS$f" role="3EZMnx">
        <node concept="1HfYo3" id="55O0TMOsS$h" role="1HlULh">
          <node concept="3TQlhw" id="55O0TMOsS$j" role="1Hhtcw">
            <node concept="3clFbS" id="55O0TMOsS$l" role="2VODD2">
              <node concept="3clFbF" id="55O0TMOsS$K" role="3cqZAp">
                <node concept="2OqwBi" id="55O0TMOsSKo" role="3clFbG">
                  <node concept="pncrf" id="55O0TMOsS$J" role="2Oq$k0" />
                  <node concept="2qgKlT" id="55O0TMOsSU8" role="2OqNvi">
                    <ref role="37wK5l" to="8ggg:6ItNp1oonCT" resolve="ruleId" />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
  </node>
</model>

